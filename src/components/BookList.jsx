import { useEffect, useState } from "react";
import {
  listenToBooks,
  updateBookQuantity,
  deleteBook,
} from "../services/bookService";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Listen to books collection
  useEffect(() => {
    const unsubscribe = listenToBooks(setBooks);
    return () => unsubscribe();
  }, []);

  // Book quantity update
  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await updateBookQuantity(id, newQuantity);
    } catch (err) {
      setError("Failed to update book quantity.");
    }
  };

  // Delete book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
    } catch (err) {
      setError("Failed to delete book.");
    }
    alert(
      `${books.find((book) => book.id === id).title} in quantity ${
        books.find((book) => book.id === id).quantity
      } has been deleted.`
    );
  };

  //Edit quantity
  const handleEditQuantity = (id, currentQuantity) => {
    setEditing({ id, currentQuantity });
  };

  const handleBlur = (id, quantity) => {
    if (quantity === "") return setEditing(null);
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return setEditing(null);
    }
    handleUpdateQuantity(id, parsedQuantity);
    setEditing(null);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Book Inventory
      </h2>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Errors */}
      {error && <p className="text-red-600 text-lg mb-6">{error}</p>}

      {/* Table */}
      {filteredBooks.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          No matching books found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 border border-gray-300 text-left text-lg">
                  Title
                </th>
                <th className="px-6 py-4 border border-gray-300 text-left text-lg">
                  Author
                </th>
                <th className="px-6 py-4 border border-gray-300 text-center text-lg">
                  Quantity
                </th>
                <th className="px-6 py-4 border border-gray-300 text-center text-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border border-gray-300">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 border border-gray-300 text-center">
                    {editing?.id === book.id ? (
                      <input
                        type="number"
                        defaultValue={editing.quantity}
                        onBlur={(e) => handleBlur(book.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleBlur(book.id, e.target.value);
                        }}
                        autoFocus
                        className="w-20 p-2 border border-gray-300 rounded-md text-center"
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleEditQuantity(book.id, book.quantity)
                        }
                        className="w-20 p-2 border border-gray-300 rounded-md text-center"
                      >
                        {book.quantity}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 border border-gray-300 text-center">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(book.id, book.quantity + 1)
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        book.quantity > 0 &&
                        handleUpdateQuantity(book.id, book.quantity - 1)
                      }
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
