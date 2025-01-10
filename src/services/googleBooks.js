const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1";
const API_KEY = "your_api_key";

export const searchBooks = async (query, maxResults = 10) => {
  const url = `${GOOGLE_BOOKS_API_URL}/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=${maxResults}&key=${API_KEY}`;

  const reponse = await fetch(url);
  if (!reponse.ok) {
    throw new Error("Failed to fetch books from Google Books API");
  }

  const data = await reponse.json();
  return data.items || [];
};

export const getBookDetails = async (bookId) => {
  const url = `${GOOGLE_BOOKS_API_URL}/volumes/${bookId}?key=${API_KEY}`;

  const reponse = await fetch(url);
  if (!reponse.ok) {
    throw new Error("Failed to fetch book details from Google Books API");
  }

  return await reponse.json();
};
