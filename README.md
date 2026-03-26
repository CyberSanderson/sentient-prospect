# Sentient Prospect | AI-Native Sales Intelligence

**[Live Demo](https://www.sentientprospect.com/)** | **[Vite + TypeScript Architecture]**

Sentient Prospect is a high-velocity prospecting engine that transforms unstructured web data into structured, actionable B2B dossiers. Built for speed and precision using the Gemini 2.5 ecosystem.

## 🏗️ Technical Architecture

This project follows a modular "Service-Oriented" architecture to ensure scalability and separation of concerns:

- **`/api`**: Edge-ready communication layers for LLM orchestration.
- **`/services`**: Business logic for data extraction and prospect profiling.
- **`/lib`**: Shared utilities, custom JSON parsers, and Firebase configuration.
- **`/views` & `/components`**: A clear distinction between page-level logic and reusable UI atoms.

## 🚀 The AI Stack
- **Engine:** Google Gemini 2.5 (Pro & Flash)
- **Pattern:** Agentic Workflows for data validation and schema enforcement.
- **Data Integrity:** Custom TypeScript interfaces (`types.ts`) ensuring 1:1 mapping between AI outputs and frontend state.

## 🛠️ Performance Highlights
- **Vite-Powered HMR:** Optimized development cycle for rapid 0→1 iteration.
- **Firebase Integration:** Real-time data persistence with Firestore and secure Auth.
- **Tailwind + Radix:** Accessible, high-performance UI components with 95+ Lighthouse scores.

## 📈 Key Engineering Wins
- **Schema Resilience:** Engineered robust error handling for LLM JSON outputs, preventing UI crashes during high-latency AI calls.
- **State Management:** Cleanly separated AI orchestration from UI rendering, allowing for future-proofed model swapping (e.g., O1/GPT-4o).
