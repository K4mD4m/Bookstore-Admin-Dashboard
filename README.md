# Bookstore Inventory Management App 📚

This is a React-based application for managing the inventory of a bookstore. It allows you to search for books using the Google Books API and manage the inventory using Firebase. The app is styled with Tailwind CSS and uses React Router for navigation between components.

## Features

- **Search Books**: Search for books using the Google Books API.
- **Inventory Management**: View and manage the inventory of books stored in Firebase.
- **Responsive UI**: The app is responsive by Tailwind CSS.
- **Navigation**: React Router is used for seamless navigation between the search and inventory pages.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Google Books API**: To search and fetch book data.
- **Firebase**: To store and manage the bookstore's inventory.
- **React Router**: For routing and navigation between components.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and modern UIs.

## Setup

To get started with this project, follow the steps below.

### 1. Clone the Repository

Clone the repository to your local machine.

### 2. Navigate to the project directory and install the necessary dependencies.

cd bookstoreadmindashboard
npm install

### 3. Setup Firebase

Create a Firebase project and configure Firebase Firestore for managing the inventory data.

Go to the Firebase Console.

Create a new project (or use an existing one).

Enable Firestore in the Firebase console.

Obtain your Firebase config credentials from the Firebase Console.

Setup firebaseConfig.js with your apiKey and others dependencies

### 4. Setup Books API

Enter your apiKey from Google Books API in googleBooks.js

### 5. Run the App

npm run build/ npm run dev

## Usage

- **Search for Books**: Go to the search page and use the search bar to search for books. Results will be displayed from the Google Books API, and you can choose to add books to the inventory.
- **View inventory**: On the inventory page, you can view and search all the books stored in the Firebase Firestore and manage your stock.

## Contributing

Feel free to fork the repository and create pull requests for any improvements or fixes.

## License

This project is licensed under the MIT License.
