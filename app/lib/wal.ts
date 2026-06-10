// Write-Ahead Log State Engine
// Implements: Append-Only Ledger · LSNs · Transaction Lifecycle · MVCC Snapshots

export type WALOperation =
  | 'INIT'
  | 'CHECKPOINT'
  | 'BEGIN'
  | 'WRITE'
  | 'COMMIT'
  | 'ROLLBACK'
  | 'HOVER';

export interface WALEntry {
  lsn: string;
  lsnNum: number;
  timestamp: number;
  operation: WALOperation;
  txnId: string;
  target?: string;
  payload?: string;
}

export interface UISnapshot {
  lsnNum: number;
  decodedBlocks: string[];
  activeBlockId: string | null;
}

type Subscriber = (entries: WALEntry[]) => void;

class WALStateManager {
  private readonly log: WALEntry[] = [];
  private readonly snapshots = new Map<number, UISnapshot>();
  private lsnCounter = 0;
  private txnCounter = 0;
  private subscribers: Subscriber[] = [];

  constructor() {
    this.appendInternal({ operation: 'INIT', payload: 'DATABASE_ENGINE_v1.0.0 STARTING', txnId: 'SYS_0000' });
    this.appendInternal({ operation: 'CHECKPOINT', payload: 'INITIAL_CHECKPOINT — LOG_START', txnId: 'SYS_0000' });
    this.snapshots.set(this.lsnCounter, { lsnNum: this.lsnCounter, decodedBlocks: [], activeBlockId: null });
  }

  private formatLSN(n: number): string {
    return `LSN_${String(n).padStart(4, '0')}`;
  }

  private nextLSN(): { lsn: string; num: number } {
    this.lsnCounter++;
    return { lsn: this.formatLSN(this.lsnCounter), num: this.lsnCounter };
  }

  private nextTxnId(): string {
    this.txnCounter++;
    return `TXN_${String(this.txnCounter).padStart(4, '0')}`;
  }

  private appendInternal(partial: Omit<WALEntry, 'lsn' | 'lsnNum' | 'timestamp'>): WALEntry {
    const { lsn, num } = this.nextLSN();
    const entry: WALEntry = { ...partial, lsn, lsnNum: num, timestamp: Date.now() };
    this.log.push(entry);
    return entry;
  }

  private append(partial: Omit<WALEntry, 'lsn' | 'lsnNum' | 'timestamp'>): WALEntry {
    const entry = this.appendInternal(partial);
    // Defer notification to avoid React render-during-render
    setTimeout(() => this.notify(), 0);
    return entry;
  }

  private notify(): void {
    const snapshot = [...this.log];
    this.subscribers.forEach(fn => fn(snapshot));
  }

  subscribe(fn: Subscriber): () => void {
    this.subscribers.push(fn);
    // Immediate initial delivery
    fn([...this.log]);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== fn);
    };
  }

  // ── Public API ────────────────────────────────────────────────────────────

  logHover(blockId: string): void {
    this.append({
      operation: 'HOVER',
      txnId: this.nextTxnId(),
      target: blockId,
      payload: `MEM_PTR_SCAN: ${blockId}`,
    });
  }

  executeTransaction(blockId: string, blockLabel: string, current: UISnapshot): UISnapshot {
    const txnId = this.nextTxnId();

    this.append({ operation: 'BEGIN', txnId, target: blockId, payload: `ACQUIRING_LOCK: ${blockId}` });

    const toggling = current.decodedBlocks.includes(blockId);
    const newDecoded = toggling
      ? current.decodedBlocks.filter(id => id !== blockId)
      : [...current.decodedBlocks, blockId];

    this.append({
      operation: 'WRITE',
      txnId,
      target: `UI_STATE: '${blockId}'`,
      payload: toggling
        ? `ENCODE_PAYLOAD: RE-ENCRYPTING ${blockLabel}`
        : `DECODE_PAYLOAD: MATERIALIZING ${blockLabel}`,
    });

    const next: UISnapshot = {
      lsnNum: 0, // filled after commit
      decodedBlocks: newDecoded,
      activeBlockId: toggling ? null : blockId,
    };

    const commit = this.append({ operation: 'COMMIT', txnId, target: blockId, payload: 'WRITE_STABLE_STORAGE: DURABLE' });
    next.lsnNum = commit.lsnNum;
    this.snapshots.set(commit.lsnNum, { ...next });

    return next;
  }

  executeRollback(targetLsnNum: number, _current: UISnapshot): UISnapshot {
    const txnId = this.nextTxnId();
    const targetStr = this.formatLSN(targetLsnNum);

    this.append({
      operation: 'ROLLBACK',
      txnId,
      target: targetStr,
      payload: `MVCC_RESTORE: READ_PTR → ${targetStr}`,
    });

    // Walk snapshots to find closest at-or-before targetLsnNum
    let bestLsn = 0;
    let best: UISnapshot = { lsnNum: 0, decodedBlocks: [], activeBlockId: null };

    this.snapshots.forEach((snap, lsn) => {
      if (lsn <= targetLsnNum && lsn >= bestLsn) {
        bestLsn = lsn;
        best = snap;
      }
    });

    const ckpt = this.append({ operation: 'CHECKPOINT', txnId, payload: `POST_ROLLBACK_CHECKPOINT: LSN=${targetStr}` });
    const restored: UISnapshot = { ...best, lsnNum: ckpt.lsnNum };
    this.snapshots.set(ckpt.lsnNum, restored);

    return restored;
  }

  getLog(): WALEntry[] { return [...this.log]; }
  getCurrentLsnNum(): number { return this.lsnCounter; }
}

// Module-level singleton — safe for client-side imports
export const walManager = new WALStateManager();
