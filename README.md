📄 Customer Statement Processor

This is a frontend-only React application built using Vite + React + TypeScript to validate customer transaction statements.
It supports CSV and XML file uploads, parses them in the browser using PapaParse (CSV) and fast-xml-parser (XML).
Validation is handled using Zod, and the UI is built with Material UI.
The app checks for duplicate transaction references and incorrect end balances.

▶ How to Run

Install dependencies: npm install

Start the app: npm run dev

Open http://localhost:5173 in the browser