***

# ⚡ Jernish | System.OS Portfolio

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

> **"Most developers see code as text; I see it as signals."**

An immersive, gamified, and engineer-focused portfolio that treats the web browser like an operating system. Built to bridge the gap between **Electronics & Communication Engineering (ECE)** and **Full Stack Architecture**, utilizing hardware principles to drive software UI.

---

## 📚 Table of Contents
- [🚀 Overview & Philosophy](#-overview--philosophy)
- [✨ Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Installation & Setup](#-installation--setup)
- [⌨️ Control System (Shortcuts)](#️-control-system-shortcuts)
- [🎨 Advanced Theming Engine](#-advanced-theming-engine)
- [🤖 AI Integration](#-ai-integration)
- [🔉 Audio Engineering](#-audio-engineering)
- [📂 Project Architecture](#-project-architecture)

---

## 🚀 Overview & Philosophy

This project is not a static website. It is a **Single Page Application (SPA)** engineered with the mindset of a hardware architect. 

- **Logic over Libraries:** Uses native Web APIs (AudioContext, Canvas API) over heavy third-party dependencies.
- **Performance First:** Includes a dedicated `PerformanceMode` that dynamically throttles particle effects and blur calculations.
- **Gamification:** A built-in Achievement system tracks user behavior (scrolling, theme switching, discovering secrets).

---

## ✨ Key Features

### 🖥️ Interactive "OS" Tools
- **Command Palette (`Ctrl+K`):** Omnibar navigation to jump between modules instantly.
- **Integrated Terminal (`Ctrl+T`):** A fully parsing CLI that accepts commands like `whoami`, `sysinfo`, `theme`, and `sudo`.
- **DevConsole (`Backtick` x3):** A simulated browser console exposing system stats and secret debug commands.
- **FPS & Memory Monitor:** Real-time rendering performance visualization.

### 🎮 VFX & Physics
- **Particle Engine:** Custom HTML5 Canvas implementation for background network nodes.
- **Matrix Rain:** Digital rain effect toggled via shortcuts or Easter eggs.
- **Laser Scroll:** A reading progress indicator that visualizes scroll depth as a signal beam.
- **Glitch & Holographic Effects:** UI components react to mouse movement with 3D transforms and chromatic aberration.

### 🏆 Achievement System
A persistence layer tracks user exploration:
- **Konami Code:** Input `↑ ↑ ↓ ↓ ← → ← → B A` to trigger "God Mode" visual effects.
- **Speed Demon:** Toggle performance settings to unlock badges.
- **Deep Diver:** Reach the bottom of the timeline.

---

## 🛠 Tech Stack

| Category | Technology | Reason for Choice |
|:--|:--|:--|
| **Core** | React 19 (RC) | Leveraging React Compiler & Server Components support |
| **Language** | TypeScript | Strict type safety for complex interactions |
| **Bundler** | Vite | Blazing fast HMR and build optimization |
| **Styling** | Tailwind CSS v4 | Variable-based theming without CSS-in-JS runtime overhead |
| **Animation** | Framer Motion | Complex orchestrations and gesture handling |
| **AI** | Google Gemini API | LLM integration for the "Jernish Assistant" |
| **State** | React Context API | Lightweight global state for Theme, Sound, and Toast |

---

## 🏗 Installation & Setup

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key (for the Chatbot)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-os.git
cd portfolio-os
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Launch Development Kernel
```bash
npm run dev
```
Access the system at `http://localhost:5173`

---

## ⌨️ Control System (Shortcuts)

Navigate the portfolio like a pro using these global hotkeys:

| Sequence | Action |
| :--- | :--- |
| `Ctrl` + `K` | **Command Palette:** Search anywhere, anytime. |
| `Ctrl` + `T` | **Terminal:** Open/Close the CLI. |
| `Ctrl` + `Shift` + `F` | **FPS Monitor:** Toggle performance stats. |
| `Alt` + `P` | **Performance Mode:** Toggle graphics settings (Save Battery). |
| `Ctrl` + `Shift` + `M` | **Mouse Trailer:** Toggle the following VFX. |
| `?` | **Help:** View all keyboard shortcuts. |
| ` ` ` (Tap 3x) | **Developer Console:** Open system debug logs. |

---

## 🎨 Advanced Theming Engine

The application features a proprietary **Color Arithmetic Engine** (found in `src/utils/theme.ts`).

1.  **Predefined Themes:** 14+ Presets (Midnight, Cyberpunk, Volcano, etc.).
2.  **Procedural Generation:**
    *   Select **ANY** primary hex color.
    *   The engine calculates `HSL` values to mathematically generate:
        *   **Secondary Color:** Analogous (+30° hue shift).
        *   **Accent Color:** Complementary (+180° hue shift).
        *   **Backgrounds:** Desaturated, dark-mode variants of the primary hue.
        *   **Text Contrast:** Automatically calculated for readability.
3.  **Persistence:** Your preferences are saved to `localStorage`.

---

## 🤖 AI Integration

Located in `src/components/Chatbot/Chatbot.tsx` & `src/hooks/useGeminiChat.ts`.

The portfolio embeds a fine-tuned prompt for **Google's Gemini AI**. It acts as a 24/7 representative, capable of answering questions about:
*   My Technical Skills (React, IoT, Embedded C).
*   Specific Projects (Home Automation, Oscilloscopes).
*   Contact Information.

---

## 🔉 Audio Engineering

**Fun Fact:** This project contains **ZERO** audio files.

Sound is generated programmatically using the browser's **Web Audio API** (`src/context/SoundProvider.tsx`).
*   **Hover Sounds:** High-frequency sine waves with exponential ramp-down (Simulating capacitors).
*   **Click Sounds:** Square waves with quick decay (Simulating logic switches).

This minimizes bandwidth usage while demonstrating signal processing knowledge.

---

## 📂 Project Architecture

```text
src/
├── components/
│   ├── Charts/         # D3.js / SVG Radar charts
│   ├── Chatbot/        # Gemini Integration
│   ├── Debug/          # FPS & Memory Monitors
│   ├── DevConsole/     # Simulated Browser Console
│   ├── Layout/         # Shell, Navbar, Footer
│   ├── Terminal/       # Interactive CLI
│   ├── UI/             # Reusable Atoms (Buttons, Modals, Toast)
│   └── VFX/            # Canvas Effects (Matrix, Particles, Lasers)
├── context/            # Global State (Achievements, Perf, Sound, Theme)
├── hooks/              # Custom logic (useKonami, useScroll, useScreenShake)
├── pages/              # Route definitions
└── utils/              # Mathematical helpers & Constants
```

---

## 🤝 Contributing

**Transmission Incoming:** Pull requests are welcome.
1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/NewSignal`).
3.  Commit your changes (`git commit -m 'Modulating frequency'`).
4.  Push to the Branch (`git push origin feature/NewSignal`).
5.  Open a Pull Request.

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <h3>System Status: 🟢 ONLINE</h3>
  <p>Designed & Engineered by Jernish</p>
  <p><i>Bridging Silicon to Screen</i></p>
</div>