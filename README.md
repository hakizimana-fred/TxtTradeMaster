# TxtTradeMaster

TxtTradeMaster is an automated trading bot that executes trades based on instructions provided in a text file.

## Features

- Parses text files to extract trade instructions.
- Executes market orders and limit orders.
- Integrates with ByBit cryptocurrency exchange.
- Customizable limit price for limit orders.
- Time-based execution for trades.

## Getting Started

### Prerequisites

- Node.js (version 18.16.X)
- ByBit API key and secret

### Installation

1. Clone the repository: `https://github.com/hakizimana-fred/TxtTradeMaster`
2. Install dependencies: `npm install or yarn`

### Configuration

1. Rename `.env.example` file to `.env`.
2. Replace `YOUR_API_KEY` and `YOUR_API_SECRET` in the `.env` file with your Binance API key and secret.

### Usage

1. Place your trade instructions in a text file (e.g., `instructions.txt`).
2. Run the script: `npm start instructions.txt`
