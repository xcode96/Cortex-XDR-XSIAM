# XQL Hub: Palo Alto Networks Cortex XDR/XSIAM Query Repository

XQL Hub is a centralized, community-driven repository for **XQL (XDR Query Language)** queries used in Palo Alto Networks Cortex XDR and XSIAM platforms. It allows security researchers and SOC analysts to discover, contribute, and manage high-quality detection and hunting queries mapped to the MITRE ATT&CK® framework.

## 🚀 Features

- **MITRE ATT&CK® Integration**: All queries are mapped to specific tactics and techniques, visualized through an interactive matrix.
- **Advanced Filtering**: Filter by Content Type (BIOC, Detection, Correlation), Log Sources (Agent, Network, Firewall, etc.), and Severity.
- **Local-First Persistence**: Contributions are saved to your browser's local storage, ensuring your work remains available across sessions without requiring a backend account.
- **Import/Export**: Download your entire library of queries as a JSON file or import existing JSON datasets.
- **Responsive Design**: Polished, dark-themed UI built with Tailwind CSS and Framer Motion, optimized for both desktop and mobile.

## 🛠️ Administrative Mode (dqadm)

The application includes a hidden administrative mode for power users and maintainers.

- **To activate**: Type `dqadm` (case-insensitive) into the search bar.
- **Admin Capabilities**:
  - **Edit/Delete**: Buttons will appear on every query card allowing you to modify or remove entries.
  - **Download `data.ts`**: A specialized blue button appears in the sidebar that allows you to export the entire dataset in a format compatible with the project's source code (`/src/data.ts`). This is useful for developers who want to merge community contributions back into the master codebase.

## 📥 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

1. Open the **XQL Hub**.
2. Click the **+ Contribute** button in the header.
3. Fill in the query details:
   - Name and Description
   - Author info
   - Severity and Log Sources
   - The XQL Query itself
   - MITRE ATT&CK mapping
4. Click **Save Locally**. Your query is now part of your local collection!
5. To share, use the **Export** feature in the sidebar to generate a JSON file.

## 📜 Technology Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: motion/react (Framer Motion)
- **State Management**: React Hooks & LocalStorage

---
*Disclaimer: This project is a community-led initiative and is not an official Palo Alto Networks product.*
