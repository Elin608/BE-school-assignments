import './App.css'
import { useEffect, useState } from 'react';
import axios from "axios";

type Book = {
  id: number;
  title: string;
  genre: string;
  publisher_year: number;
  author_id: number;
  Author: { name: string } | null;
};

function App() {
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3000/books");
    setBooks(response.data);
  };

  const fetchAuthors = async () => {
    const response = await axios.get("http://localhost:3000/authors");
    setAuthors(response.data);

  };

  const [books, setBooks] = useState<Book[]>([]);
  type Author = {
    id: number;
    name: string;
  };
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);
  return (
    <>
      <h1>Library</h1>
      <p>{books.length} books in the library</p>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.Author?.name} ({book.publisher_year})
          </li>
        ))}
      </ul>

      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.name}
          </li>
        ))}
      </ul>
    </>
  );

}



export default App;

