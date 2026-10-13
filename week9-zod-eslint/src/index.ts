import express from "express";
import { pool } from "./db.js";
import dotenv from "dotenv";
import { z } from "zod";
import { config } from "./env.js";
import { bookSchema, genreSchema, authorSchema } from "./schemas.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome ");
});

app.get("/books", async (req, res) => {
 
  const queryResult = genreSchema.safeParse(req.query);
  if (!queryResult.success) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  const genre =
        queryResult.data.genre;
  const sort = queryResult.data.sort;

  const orderBy = sort ? String(sort) : "id";

  const result = await pool.query(`SELECT * FROM books WHERE ($1 ::text IS NULL OR genre = $1)
        ORDER BY ${orderBy}`,

  [typeof genre === "string" ? genre : null]
  );

  res.json(result.rows);
});

app.get("/books/:id", async (req, res) => {
  const idResult =
        z.coerce.number().int().positive().safeParse(req.params.id);
  if (!idResult.success) {
    res.status(400).json({ error: "Invalid book ID" });
  }
  const id = idResult.data;

  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(result.rows[0]);
});

app.post("/books", async (req, res) => {
  const validatedBook = bookSchema.safeParse(req.body);
  if (!validatedBook.success) {
    return res.status(400).json({ errors: z.flattenError(validatedBook.error) });

  }
  const { title, genre, publisher_year, author_id } = validatedBook.data;

  try {

    const result = await pool.query("INSERT INTO books (title, genre, publisher_year, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, genre, publisher_year, author_id ?? null]);
    res.status(201).json(result.rows[0]);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error?.code === "23503") { // foreign key violation
      return res.status(400).json({ error: "Author does not exist" });
    }
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/books/:id", async (req, res) => {
  const idResult = z.coerce.number().int().positive().safeParse(req.params.id);
  if (!idResult.success) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  const id = idResult.data;
  const result = bookSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: z.flattenError(result.error) });
  }
  const book = result.data;
  try {

    const updatedBook = await pool.query("UPDATE books SET title = $1, genre = $2, publisher_year = $3, author_id = $4 WHERE id = $5 RETURNING *",
      [book.title, book.genre, book.publisher_year, book.author_id ?? null, id]);
    if (updatedBook.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json(updatedBook.rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }

});

app.patch("/books/:id", async (req, res) => {

  const idResult = z.coerce.number().int().positive().safeParse(req.params.id);
  if (!idResult.success) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  const id = idResult.data;
  const patchSchema = bookSchema.partial();
  const patchResult = patchSchema.safeParse(req.body);
  if (!patchResult.success) {
    return res.status(400).json({ error: "Invalid book data" });
  }
  const { title, genre, publisher_year } = patchResult.data;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No data provided" });
  }
  const existingBook = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  if (existingBook.rows.length === 0) {
    return res.status(404).json({ error: "Book not found" });
  }
  const book = existingBook.rows[0];
  const newtitle = title ?? book.title;
  const newgenre = genre ?? book.genre;
  const newYear = publisher_year ?? book.publisher_year;

  const result = await pool.query("UPDATE books SET title = $1, genre = $2, publisher_year = $3 WHERE id = $4 RETURNING *", [newtitle, newgenre, newYear, id]);
  res.json(result.rows[0]);
});

app.delete("/books/:id", async (req, res) => {
  const idResult = z.coerce.number().int().positive().safeParse(req.params.id);
  if (!idResult.success) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  const id = idResult.data;
  await pool.query("DELETE FROM books WHERE id = $1", [id]);
  res.status(204).send();
});

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});
app.post("/authors", async (req, res) => {

  const authorResult =
        authorSchema.safeParse(req.body);
  if (!authorResult.success) {
    return res.status(400).json({ error: "Invalid author name" });
  }

  const { name } =
        authorResult.data;
  try {
    const result = await pool.query("INSERT INTO authors (name) VALUES ($1) RETURNING *", [name]);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/authors/:id/books", async (req, res) => {
  const idResult = z.coerce.number().int().positive().safeParse(req.params.id);
  if (!idResult.success) {
    return res.status(400).json({ error: "Invalid author ID" });
  }
  const id = idResult.data;
  try {
    const result = await pool.query("SELECT books. * FROM books INNER JOIN authors ON books.author_id = authors.id WHERE authors.id = $1", [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(config.PORT, () => {
  console.log("Server is running on port 3000");
});



