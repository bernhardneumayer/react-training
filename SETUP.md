# Setup Guide for Participants

## Prerequisites Check

Before starting the training, you'll need Node.js and npm installed. Let's check if you have them:

```bash
node --version
npm --version
```

If you see version numbers (e.g., `v20.x.x` and `10.x.x`), you're good to go! Skip to [Quick Start](#quick-start).

If you get "command not found", follow the installation steps below.

---

## Installing Node.js and npm

### Option 1: Official Installer (Recommended for most users)

**Download:** https://nodejs.org/

- Choose **LTS version** (Long Term Support) - currently Node.js 20.x or 22.x
- Download the installer for your operating system
- Run the installer (it includes npm automatically)
- Restart your terminal

**Verify installation:**
```bash
node --version   # Should show v20.x.x or higher
npm --version    # Should show 10.x.x or higher
```

---

### Option 2: Using Homebrew (macOS)

If you have Homebrew installed:

```bash
brew install node
```

Verify:
```bash
node --version
npm --version
```

---

### Option 3: Using nvm (Node Version Manager) - Recommended for developers

**nvm** lets you easily switch between Node.js versions. Great if you work on multiple projects.

#### macOS/Linux:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc  # or ~/.zshrc

# Install Node.js LTS
nvm install --lts

# Verify
node --version
npm --version
```

#### Windows:

Download **nvm-windows**: https://github.com/coreybutler/nvm-windows/releases

```bash
# After installation
nvm install lts
nvm use lts

# Verify
node --version
npm --version
```

---

## Minimum Requirements

- **Node.js**: v18.x or higher (v20.x recommended)
- **npm**: v9.x or higher (comes with Node.js)
- **OS**: macOS, Linux, or Windows 10+
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: ~500MB for Node.js + project dependencies

---

## Quick Start (After Node.js is installed)

```bash
# 1. Clone the repository
git clone git@github.com:bernhardneumayer/react-training.git
cd react-training

# 2. Install dependencies (this downloads React, Vite, TypeScript, etc.)
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# The terminal will show: http://localhost:5173
```

You should see "React Training - Live Coding" in your browser!

---

## Ready to Start!

Once setup is complete, head back to the main [README.md](./README.md) for training instructions.

If you hit issues during setup, don't worry - we'll sort it out before or at the start of the training session! 🚀
