import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const booksCollection = collection(db, "books");

// Add new book
export const addBook = async (book) => {
  try {
    const docRef = await addDoc(booksCollection, book);
    return { id: docRef.id, ...book };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

//Download all books
export const getBooks = async () => {
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update book
export const updateBookQuantity = async (id, quantity) => {
  const bookDoc = doc(db, "books", id);
  await updateDoc(bookDoc, { quantity });
};

//Delete book
export const deleteBook = async (id) => {
  const bookDoc = doc(db, "books", id);
  await deleteDoc(bookDoc);
};

// Real-time updates
export const listenToBooks = (callback) => {
  const booksCollection = collection(db, "books");
  return onSnapshot(booksCollection, (snapshot) => {
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(books);
  });
};
