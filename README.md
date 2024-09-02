# Finance Tracker Frontend

This application is the frontend for managing financial transactions. It provides a user interface to interact with the finance API, allowing for the visualization, creation, editing, and deletion of transactions, as well as filtering by categories and dates.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Main Components](#main-components)
- [Error Handling](#error-handling)

## Features

- **Transaction Visualization**: Displays all financial transactions with pagination options.
- **Filtering**: Filters transactions by date and category.
- **Transaction Management**: Allows creating, updating, and deleting transactions.
- **Category List**: Displays a list of available categories for transactions.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/JEsteban1999/finance-tracker-frontend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd finance-tracker-frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the application:

    ```bash
    npm start
    ```

## Usage

Once the application is running, you can interact with it through `http://localhost:3000` in your web browser.

## Main Components

- **TransactionList**: Lists all available transactions, with support for pagination and filtering.
- **TransactionForm**: Form for creating and editing transactions.
- **CategoryList**: Displays all available categories, retrieved from the backend.
- **Summary**: Displays a summary of income, expenses, and net balance.

## Error Handling

- **Data Load Error**: Displays an error message if data cannot be retrieved from the backend.
- **Validation Error**: Displays an error message if the data entered in the forms is invalid.
