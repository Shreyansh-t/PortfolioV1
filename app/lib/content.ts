export interface ContentLink {
  label: string;
  url: string;
}

export interface BlockContent {
  title: string;
  subtitle: string;
  lines: string[];
  links?: ContentLink[];
}

export interface MemoryBlock {
  id: string;
  memAddr: string;
  label: string;
  shortLabel: string;
  hexPreview: string;  // hex bytes shown in locked state
  gridCol: number;     // 0 or 1
  content: BlockContent;
}

export const MEMORY_BLOCKS: MemoryBlock[] = [
  {
    id: 'MEM_BLOCK_A',
    memAddr: '0x00A1',
    label: 'UB_SYSTEMS_RESEARCH',
    shortLabel: 'UB RESEARCH',
    hexPreview: '55 42 20 44 42 20 52 65 73 65 61 72 63 68 20 4C 61 62',
    gridCol: 0,
    content: {
      title: 'SYSTEMS_RESEARCH_INTERN',
      subtitle: 'Analytical Database Lab — Univ. at Buffalo | Prof. Zhao | Apr 2026–Present',
      lines: [
        '▸ Researching AB-Tree index structure in DuckDB C++ codebase',
        '▸ Supporting native high-performance random indexing & sampling',
        '▸ Mapped DuckDB execution pipeline via GDB — traced ART lifecycle',
        '▸ Designed hook-ins for secondary aggregate indices in planner',
        '▸ Analyzed chunk-level bulk-loading process for AB-Tree stubs',
        '▸ Building async merge pipeline to consolidate index structures',
        '▸ Optimizing analytical query paths for massive OLAP workloads',
      ],
    },
  },
  {
    id: 'MEM_BLOCK_B',
    memAddr: '0x00B2',
    label: 'DUCKDB_ABTREE_IMPL',
    shortLabel: 'DUCKDB AB-TREE',
    hexPreview: '44 75 63 6B 44 42 20 41 42 2D 54 72 65 65 20 49 6E 64',
    gridCol: 1,
    content: {
      title: 'DUCKDB_SECONDARY_INDEX_IMPL',
      subtitle: 'AB-Tree: Aggregate B-Tree for OLAP Random Sampling',
      lines: [
        '▸ Goal: native O(log n) random indexing on billion-row tables',
        '▸ AB-Tree nodes carry pre-aggregated subtree counts',
        '▸ ART (Adaptive Radix Tree) analysis via GDB breakpoints',
        '▸ Pipeline: Parser → Planner → Optimizer → Physical Executor',
        '▸ Bulk-loader produces chunk-level index stubs from column blocks',
        '▸ Async merge consolidates chunk stubs → unified AB-Tree',
        '▸ Target: sub-ms reservoir sampling — zero full-scan overhead',
      ],
      links: [
        { label: '→ DuckDB C++ Source', url: 'https://github.com/duckdb/duckdb' },
      ],
    },
  },
  {
    id: 'MEM_BLOCK_C',
    memAddr: '0x00C3',
    label: 'BOILERBRIDGE_FULLSTACK',
    shortLabel: 'BOILERFIXIT',
    hexPreview: '42 6F 69 6C 65 72 46 69 78 49 74 20 46 75 6C 6C 53 74',
    gridCol: 0,
    content: {
      title: 'BOILERFIXIT_PLATFORM',
      subtitle: 'Full-Stack Application — MERN + Redis + Stripe | Status: ONGOING',
      lines: [
        '▸ Full-stack platform for appliance issue reporting @ Purdue',
        '▸ Custom distance-based dynamic pricing algorithm',
        '▸ Redis caching layer for session + query throughput',
        '▸ Real-time tracking via WebSockets — multi-campus scalable',
        '▸ Stripe integration: dynamic pricing + payment pipeline',
        '▸ JWT auth with role-based access: student / tech / admin',
        '▸ Stack: MongoDB, Express, React, Node.js, Redis, Google Maps',
      ],
      links: [
        { label: '→ GitHub Repo', url: 'https://github.com/Shreyansh-t/Boiler-Fixit' },
      ],
    },
  },
  {
    id: 'MEM_BLOCK_D',
    memAddr: '0x00D4',
    label: 'IISC_HPC_RESEARCH',
    shortLabel: 'HPC / IISc',
    hexPreview: '49 49 53 63 20 48 50 43 20 48 69 67 68 2D 50 65 72 66',
    gridCol: 1,
    content: {
      title: 'HIGH_PERFORMANCE_COMPUTING',
      subtitle: 'Systems Research — HPC & Parallel Computing | IISc Collaboration',
      lines: [
        '▸ Parallel algorithm design for large-scale scientific workloads',
        '▸ Cache-oblivious algorithms for NUMA-aware memory hierarchies',
        '▸ MPI + OpenMP hybrid parallelism for HPC cluster deployments',
        '▸ Lock-free data structures: queues, hash maps, skip lists',
        '▸ Profiling: perf, VTune — cache miss & branch prediction analysis',
        '▸ AF_XDP sockets + DPDK for ultra-low latency I/O paths',
        '▸ Applied: kernel-bypass networking, custom memory allocators',
      ],
    },
  },
  {
    id: 'MEM_BLOCK_E',
    memAddr: '0x00E5',
    label: 'TRADING_ENGINE_CPP',
    shortLabel: 'TRADING ENGINE',
    hexPreview: '43 2B 2B 20 54 72 61 64 69 6E 67 20 45 6E 67 69 6E 65',
    gridCol: 0,
    content: {
      title: 'LOW_LATENCY_TRADING_ENGINE',
      subtitle: 'C++ | AF_XDP | Lock-Free Queues | June–August 2025',
      lines: [
        '▸ High-performance trading exchange — ultra-low latency target',
        '▸ 200K match events/sec · 1K inserts/sec under synthetic load',
        '▸ AF_XDP kernel bypass: 1.2M → 5.2M market data updates/sec',
        '▸ Memory pool: 343 → 44 CPU cycles/alloc  (87% reduction)',
        '▸ Lock-free SPSC/MPSC queues via CAS — zero mutex contention',
        '▸ Order book: price-time priority via red-black tree structure',
        '▸ Custom NUMA-aware allocator for hot-path order objects',
      ],
      links: [
        { label: '→ GitHub Repo', url: 'https://github.com/Shreyansh-t/kernel-bypass-trading-exchange' },
      ],
    },
  },
  {
    id: 'MEM_BLOCK_F',
    memAddr: '0x00F6',
    label: 'IDENTITY_MATRIX',
    shortLabel: 'IDENTITY',
    hexPreview: '53 68 72 65 79 61 6E 73 68 20 54 65 68 61 6E 67 75 72',
    gridCol: 1,
    content: {
      title: 'SHREYANSH_TEHANGURIA',
      subtitle: 'Data Science @ Purdue University | Systems & AI Engineer',
      lines: [
        '▸ Rising Senior — Data Science @ Purdue University',
        '▸ SWE by projects. DS by degree. AI Engineer by exp.',
        '▸ Obsessed: caching · compilation · compute',
        '▸ Languages: C++, Python, SQL, TypeScript',
        '▸ Frameworks: MERN, FastAPI, LangGraph, PyTorch',
        '▸ Email:    stehangu@purdue.edu',
        '▸ GitHub:   github.com/Shreyansh-t',
        '▸ LinkedIn: linkedin.com/in/shreyanshtehanguria',
      ],
      links: [
        { label: '→ GitHub', url: 'https://github.com/Shreyansh-t' },
        { label: '→ LinkedIn', url: 'https://linkedin.com/in/shreyanshtehanguria' },
      ],
    },
  },
];
