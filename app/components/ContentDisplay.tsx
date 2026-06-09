'use client'

import React from 'react'
import ContactForm from './ContactForm'
import Terminal from './Terminal'

interface ContentDisplayProps {
  currentPath: string
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ currentPath }) => {
  const getContent = () => {
    switch (currentPath) {
      case '~':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold glow mb-2">
                SHREYANSH TEHANGURIA
              </div>
              <div className="text-lg sm:text-xl font-bold text-terminal-gray">
                SOFTWARE ENGINEER
              </div>
            </div>

            <div className="text-lg sm:text-xl font-bold glow text-center">
              &gt; SYSTEM STATUS: ONLINE
            </div>

            <div className="text-terminal-gray text-center text-sm sm:text-base px-2">
              Welcome to Shreyansh&apos;s digital terminal. I&apos;m a rising senior in Data Science @ Purdue,
              building fast, scalable systems at the edge of AI and engineering.
            </div>

            <div className="border-t border-terminal-fg opacity-30" />

            <Terminal />
          </div>
        )

      case 'about':
        return (
          <div className="space-y-4">
            <div className="text-lg sm:text-xl font-bold glow">
              &gt; ABOUT.TXT
            </div>
            <div className="text-terminal-gray">
              ================================
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <div>NAME: Shreyansh Tehanguria</div>
              <div>LOCATION: West Lafayette, Indiana</div>
              <div>STATUS: Rising Senior @ Purdue University</div>
            </div>
            <div className="mt-4">
              <div className="text-terminal-gray mb-2">IDENTITY.MATRIX:</div>
              <div className="text-xs sm:text-sm space-y-1">
                <div>• SWE by projects, Data Scientist by degree, AI Engineer by experience</div>
                <div>• Obsessed with speed: caching, compilation, compute</div>
                <div>• Building at the intersection of AI + Systems</div>
                <div>• Passionate about bare metal programming in C++</div>
                <div>• Always learning and reading about enhanced performance and speed</div>
                <div>• Self-taught programmer, Rising Senior in Data Science @ Purdue</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-terminal-gray mb-2">STACK.OVERFLOW:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div>• Languages: C++, Python, SQL, JavaScript</div>
                <div>• Frameworks: MERN, Django, Flask, FastAPI</div>
                <div>• AI/ML: PyTorch, TensorFlow, Keras, scikit-learn</div>
                <div>• DevOps: Docker, Redis, PostgreSQL, Nginx</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-terminal-gray">PHILOSOPHY.TXT:</div>
              <div className="text-xs sm:text-sm">
                &quot;Write code like stories: clear, efficient, and slightly over-engineered.&quot;<br/>
                &quot;Automate. Cache. Parallelize. Repeat.&quot;
              </div>
            </div>
            <div className="mt-4">
              <div className="text-terminal-gray">HOBBIES.LST:</div>
              <div className="text-xs sm:text-sm">
                Tennis • Gym • Boxing • Reading about new technologies
              </div>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="text-lg sm:text-xl font-bold glow">
              &gt; PROJECTS.DIR
            </div>
            <div className="text-terminal-gray">
              ================================
            </div>
            <div className="space-y-4">
              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">PROJECT_001: Low-Latency C++ Trading Engine</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Tech: C++, AF_XDP, Lock-free Queues, Kernel Bypass | Status: COMPLETED | June 2025 – August 2025
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  High-performance trading exchange engineered for ultra-low latency operations. Built with lock-free queues
                  and custom memory pools, achieving 200K match events/sec and 1K inserts/sec under synthetic load.
                  Implemented kernel network stack bypass using AF_XDP sockets, boosting market data throughput from
                  1.2M to 5.2M updates/sec. Optimized memory pool from 343 to 44 CPU cycles per operation.
                </div>
                <div className="text-xs mt-2">
                  <a href="https://github.com/Shreyansh-t/kernel-bypass-trading-exchange" className="text-terminal-fg hover:text-terminal-white break-all">
                    → github.com/Shreyansh-t/kernel-bypass-trading-exchange
                  </a>
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">PROJECT_002: Video Analyst AI — RAG Chatbot for Video Content Analysis</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Tech: Python, FastAPI, React, LangGraph, Qdrant Vector DB, Llama 3.3 (Groq), Whisper AI, HuggingFace | June 2026
                </div>
                <div className="text-xs sm:text-sm mt-2 space-y-1">
                  <div>• Built decoupled, parallel execution graphs using LangGraph to isolate intensive async media ingestion workflows from stateful user chat sessions</div>
                  <div>• Implemented async FastAPI backend with session-scoped UUID metadata filtering inside Qdrant vector DB to guarantee zero cross-user data leakage</div>
                  <div>• Developed automated fallback ingestion system via yt-dlp and OpenAI Whisper to process short-form assets lacking native closed-caption tracks</div>
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">PROJECT_003: Credify <span className="text-terminal-gray font-normal">— CalHacks Berkeley Hackathon Winner</span></div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Tech: JavaScript (ES6+), Node.js, Agentic AI Design, Chrome Extensions API, Shadow DOM, MutationObserver | October 2025
                </div>
                <div className="text-xs sm:text-sm mt-2 space-y-1">
                  <div>• Architected an async background service worker utilizing LLM-driven agentic workflows to grade social text content, surface logical discrepancy flags, and return detailed validity matrices</div>
                  <div>• Engineered high-performance DOM-traversal layers penetrating Reddit&apos;s nested shadow DOM and web-component architectures using the MutationObserver API</div>
                  <div>• Optimized extension runtime latency via chrome.storage caching, mitigating redundant LLM inference calls and eliminating network round-trip overhead</div>
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">PROJECT_004: BoilerFixIt</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Tech: MERN, Redis, Stripe, Google Maps API | Status: ONGOING
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  Full-stack platform streamlining appliance issue reporting for Purdue students.
                  Features custom distance-based pricing, Redis caching for performance optimization,
                  and real-time tracking designed for scalability across student communities.
                </div>
                <div className="text-xs mt-2">
                  <a href="https://github.com/Shreyansh-t/Boiler-Fixit" className="text-terminal-fg hover:text-terminal-white break-all">
                    → github.com/Shreyansh-t/Boiler-Fixit
                  </a>
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">PROJECT_005: Airbnb Price Tracker</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Tech: Python, Django, Selenium, BeautifulSoup, MySQL | Status: COMPLETED
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  Price tracking system monitoring up to 50 properties with 12-hour intervals.
                  Built Django REST API with 8 endpoints, used Celery for async scheduling,
                  and optimized SQLite schema for faster query performance.
                </div>
                <div className="text-xs mt-2">
                  <a href="https://github.com/Shreyansh-t/Airbnb-Price-Tracker" className="text-terminal-fg hover:text-terminal-white break-all">
                    → github.com/Shreyansh-t/Airbnb-Price-Tracker
                  </a>
                </div>
              </div>
            </div>
          </div>
        )

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="text-lg sm:text-xl font-bold glow">
              &gt; EXPERIENCE.LOG
            </div>
            <div className="text-terminal-gray">
              ================================
            </div>
            <div className="space-y-4">
              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">SYSTEMS_RESEARCH_INTERN</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Analytical Database Lab, University at Buffalo | Under Prof. Zhao | April 2026 – Present
                </div>
                <div className="text-xs sm:text-sm mt-2 space-y-1">
                  <div>• Researching an Aggregate B-Tree (AB-Tree) index structure within the core C++ codebase of DuckDB to support native, high-performance random indexing and sampling</div>
                  <div>• Mapped DuckDB&apos;s execution pipeline, using GDB to trace the structural lifecycle of its Adaptive Radix Tree (ART) implementation to design cohesive hook-ins for secondary aggregate indices</div>
                  <div>• Analyzed and evaluated the database&apos;s existing chunk-level bulk-loading process for AB-Trees to understand how data blocks preserve structural metadata and pre-aggregated values during compilation</div>
                  <div>• Developing an asynchronous merging pipeline to consolidate these chunk-level bulk-loaded index structures, optimizing analytical query execution paths for massive OLAP workloads</div>
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">AI_ENGINEER_INTERN</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Company: Legalgini | Location: Gurugram, India | Jan 2025 – May 2025
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  • Optimized CoLBERT-based RAG pipeline, boosting document retrieval accuracy from 70% to 96%<br/>
                  • Integrated Gemini Flash (LLM) in Django platform, increasing onboarding engagement by 40%<br/>
                  • Built hybrid search pipeline with 400ms query latency using bi-encoder and keyword retrieval
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">AUTONOMOUS_SYSTEMS_RESEARCHER</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Prof. J.M Goppert — Purdue University | Location: West Lafayette, IN | Jan 2025 – May 2025
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  • Designed A*, RRT, and RRT* navigation algorithms for autonomous NARCAN-delivery drone<br/>
                  • Processed Intel RealSense 3D point-cloud data into 2D occupancy grids<br/>
                  • Reduced computational load by 30% and optimized motion-planning pipeline
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">PROJECT_MANAGER_&_TA</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Purdue University | Location: West Lafayette, IN | Aug 2023 – May 2024
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  • Led team of 7 researchers conducting market research across 40 states<br/>
                  • Supervised LSTM model development achieving 95% accuracy in sentiment analysis<br/>
                  • Managed data pipeline integrating Hugging Face datasets with 100+ manually labeled transcripts
                </div>
              </div>

              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">DATA_SCIENCE_RESEARCHER</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Purdue University | Location: West Lafayette, IN | Aug 2022 – May 2023
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  • Analyzed 30,000+ data points per variable for agricultural sensor insights project<br/>
                  • Optimized data sampling at 30/45/60-minute intervals improving processing efficiency<br/>
                  • Evaluated multiple Weather APIs for accurate weather prediction requirements
                </div>
              </div>
            </div>
          </div>
        )

      case 'blog':
        return (
          <div className="space-y-4">
            <div className="text-lg sm:text-xl font-bold glow">
              &gt; BLOG.INDEX
            </div>
            <div className="text-terminal-gray">
              ================================
            </div>
            <div className="space-y-4">
              <div className="border border-terminal-fg p-3">
                <div className="font-bold text-sm sm:text-base">ColBERT Made Simple: Step-by-Step PDF Search Engine with LangChain and RAGatouille</div>
                <div className="text-xs sm:text-sm text-terminal-gray">
                  Date: 2024-12-15 | Category: AI/ML
                </div>
                <div className="text-xs sm:text-sm mt-2">
                  A comprehensive guide to building a PDF search engine using ColBERT retrieval system,
                  LangChain framework, and RAGatouille for efficient document retrieval and Q&amp;A.
                </div>
                <div className="text-xs mt-2">
                  <a href="https://arc.net/l/quote/unnqhwbp" target="_blank" rel="noopener noreferrer" className="text-terminal-fg hover:text-terminal-white underline break-all">
                    → Read on Medium
                  </a>
                </div>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="text-lg sm:text-xl font-bold glow">
              &gt; CONTACT.INFO
            </div>
            <div className="text-terminal-gray">
              ================================
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div className="text-xs sm:text-sm">
                  <div className="mb-4">
                    <div className="font-bold">EMAIL_ADDRESS:</div>
                    <div className="break-all">stehangu@purdue.edu</div>
                  </div>

                  <div className="mb-4">
                    <div className="font-bold">SOCIAL_LINKS:</div>
                    <div className="break-all">GitHub: <a href="https://github.com/shreyanshtehanguria" target="_blank" rel="noopener noreferrer" className="text-terminal-fg hover:text-terminal-white underline">github.com/shreyanshtehanguria</a></div>
                    <div className="break-all">LinkedIn: <a href="https://linkedin.com/in/shreyanshtehanguria" target="_blank" rel="noopener noreferrer" className="text-terminal-fg hover:text-terminal-white underline">linkedin.com/in/shreyanshtehanguria</a></div>
                  </div>

                  <div className="mb-4">
                    <div className="font-bold">PREFERRED_CONTACT:</div>
                    <div>Email for professional inquiries</div>
                    <div>LinkedIn for networking</div>
                  </div>

                  <div className="mt-6 p-3 border border-terminal-fg">
                    <div className="font-bold">AVAILABILITY:</div>
                    <div className="text-terminal-gray">
                      Rising Senior @ Purdue University (Data Science).<br/>
                      Open to: Internships, Full-time SWE/ML/DS/AI roles.<br/>
                      Response time: 2-4 hours.
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <div className="text-xl font-bold glow">
              &gt; ERROR: PATH_NOT_FOUND
            </div>
            <div className="text-terminal-gray">
              The requested path does not exist.
            </div>
            <div className="text-sm">
              Available paths: ~, about, projects, experience, blog, contact
            </div>
          </div>
        )
    }
  }

  return (
    <div className="border border-terminal-fg border-glow p-4 sm:p-6">
      {getContent()}
    </div>
  )
}

export default ContentDisplay
