# Create Dapp Starter

[![NPM Version](https://img.shields.io/npm/v/create-dapp-starter.svg)](https://www.npmjs.com/package/create-dapp-starter)
[![License](https://img.shields.io/npm/l/create-dapp-starter.svg)](https://github.com/<YOUR_GITHUB_USERNAME>/create-dapp-starter/blob/main/LICENSE)

An interactive CLI tool to quickly scaffold a modern Web3 frontend. Generate a ready-to-use Next.js project with wagmi, Tailwind CSS, and a powerful, ABI-driven contract dashboard in seconds.

## ✨ Features

-   **Interactive Setup:** A friendly command-line interface asks you everything it needs.
-   **Next.js Foundation:** Built on the latest Next.js with the App Router.
-   **Wagmi Powered:** Comes pre-configured with wagmi for all your wallet and contract interactions.
-   **Dynamic Contract Dashboard:** Provide your contract ABI and get an instant, fully interactive UI to test every `read`, `write`, and `payable` function.
-   **Secure by Default:** Automatically configures API keys using environment variables (`.env.local`).
-   **Styled with Tailwind CSS:** Includes a clean, modern design system ready for customization.
-   **TypeScript Ready:** Strongly typed from the start for a better developer experience.

## 🚀 Getting Started

To create a new project, run the following command in your terminal:

```bash
npm init dapp-starter
```
*or `npx create-dapp-starter`*

This will kick off the interactive CLI, which will guide you through the setup process:

1.  **Project Name:** Name your new dApp folder.
2.  **Framework & Language:** Choose Next.js & TypeScript.
3.  **API Keys:** Provide your WalletConnect and Alchemy keys.
4.  **Chains:** Select the blockchain networks you want to support.
5.  **Contract Details:** Optionally, provide your contract address and ABI to auto-generate the contract dashboard.

## The Generated Project

After the setup is complete, you will have a new project directory with everything you need:

-   ✅ A fully configured Next.js + wagmi application.
-   ✅ API keys secured in a `.env.local` file.
-   ✅ A stunning, responsive UI built with Tailwind CSS.
-   ✅ A `/dev` page that acts as a live dashboard for your smart contract.
-   ✅ A simple, clean, and extensible project structure.

## Local Development (Contributing)

To contribute to this CLI tool itself:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Rohan-droid7341/create-dapp-starter.git
    cd create-dapp-starter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run for testing:**
    Create a separate, empty folder and run the CLI from there to test your changes.
    ```bash
    # From inside your test folder:
    node /path/to/create-dapp-starter/index.js
    ```

## 📜 License

This project is licensed under the MIT License.