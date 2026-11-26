import './App.css'
import { useEffect, useState } from 'react';
import axios from "axios";
import { bookFormSchema } from "./schemas";
import { z } from "zod";

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
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publisherYear, setPublisherYear] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [errors, setErrors] =
    useState<Record<string, string[]>>({});

  const handleSubmit = async (event: React.FormEvent) => {
   event.preventDefault();
    const result = bookFormSchema.safeParse({
      title,
      genre,
      publisher_year:
        publisherYear,
      author_id: authorId,
    })
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors);
      return
    }
    setErrors({});

    await axios.post("http://localhost:3000/books", result.data);
    await fetchBooks();
  }


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

      <h2>Add a book</h2>
      <form onSubmit={handleSubmit}>


        <input type='text'
          placeholder='Title'
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)} />
        <p>{errors.title?.[0]}</p>


        <input type='text'
          placeholder='Genre'
          value={genre}
          onChange={(e) =>
            setGenre(e.target.value)} />
        <p>{errors.genre?.[0]}</p>

        <input type='number'
          placeholder='Publisher year'
          value={publisherYear}
          onChange={(e) =>
            setPublisherYear(e.target.value)} />
        <p>{errors.publisher_year?.[0]}</p>

        <select value={authorId}
          onChange={(e) =>
            setAuthorId(e.target.value)}>
          <option value="">Choose an author</option>
          {authors.map((author) => (
            <option key={author.id}
              value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <p>{errors.author_id?.[0]}</p>
        <button type='submit'>Add book</button>
      </form>
    </>
  );

}



export default App;

