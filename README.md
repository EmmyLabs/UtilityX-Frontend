# UtilityX Frontend

The UtilityX Frontend provides the user interface for the UtilityX platform.
It allows users to interact with the peer-to-peer utility marketplace, manage their wallets, and perform transactions.

## Overview

This application allows users to:

* Create accounts and log in
* Fund their wallet
* Buy airtime and data
* Trade utilities in the marketplace
* View transaction history
* Receive notifications

The frontend communicates with the backend API to execute transactions and retrieve marketplace data.

## Tech Stack

* Flutter (Mobile Application)
* Next.js / React (Web Dashboard)
* REST API integration
* State management and secure authentication

## Folder Structure

src/
├── components/        # Reusable UI components
├── screens/           # Application pages and views
├── services/          # API communication layer
├── hooks/             # Custom hooks / state logic
├── utils/             # Utility functions
├── assets/            # Images, icons, fonts
└── main.dart / index.tsx

## Getting Started

1. Clone the repository
2. Install dependencies

```bash
npm install
```

or for Flutter

```bash
flutter pub get
```

3. Start the development server

```bash
npm run dev
```

or

```bash
flutter run
```

## Responsibilities of this Repository

* User interface
* Marketplace interaction
* Wallet display
* API communication
* User experience improvements

## Contribution

Please read `CONTRIBUTING.md` before submitting pull requests.
