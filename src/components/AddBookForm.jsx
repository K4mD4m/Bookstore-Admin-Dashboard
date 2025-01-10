import { useState } from "react";
import { searchBooks } from "../services/googleBooks";
import { addBook } from "../services/bookService";

const AddBookForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search for books
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const books = await searchBooks(query);
      setResults(books);
      setAddedBooks([]);
    } catch (err) {
      setError("An error occurred while searching for books");
    } finally {
      setLoading(false);
    }
  };

  // Add book to inventory
  const handleAddBook = async (book, quantity) => {
    try {
      const newBook = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown Author",
        quantity: parseInt(quantity, 10),
      };
      await addBook(newBook);

      setAddedBooks((prev) => [...prev, book.id]);

      setTimeout(() => {
        setAddedBooks((prev) => prev.filter((id) => id !== book.id));
      }, 3500);
    } catch (err) {
      console.error("Error adding book to Firebase:", err);
      alert("An error occurred while adding the book to the inventory.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Add book to inventory
      </h2>

      {/* Search form */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter book title or author"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`px-5 py-3 font-semibold text-white rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Searching" : "Search"}
        </button>
      </div>

      {/* Errors */}
      {error && <p className="text-red-600 text-lg mb-6">{error}</p>}

      {/* Results */}
      <ul className="space-y-6">
        {results.map((book) => (
          <li
            key={book.id}
            className="p-6 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <strong className="text-xl text-gray-800">
                {book.volumeInfo.title}
              </strong>{" "}
              <span className="text-base text-gray-600">
                —{" "}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Unknown Author"}
              </span>
            </div>
            <div className="flex items-center gap-6">
              {addedBooks.includes(book.id) ? (
                <span className="text-green-600 font-semibold text-lg">
                  Added to inventory
                </span>
              ) : (
                <>
                  <input
                    type="number"
                    min="1"
                    defaultValue="10"
                    id={`quantity-${book.id}`}
                    className="w-20 p-2 border border-gray-300 rounded-md text-center shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => {
                      const quantity = document.getElementById(
                        `quantity-${book.id}`
                      ).value;
                      handleAddBook(book, quantity);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add to inventory
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddBookForm;
