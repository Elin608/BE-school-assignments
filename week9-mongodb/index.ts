import express from "express";
import mongoose from "mongoose";
import Book from "./models/book.js";
import "./db.js";
import "dotenv/config";
import Author from "./models/author.js";

const app = express();
app.use(express.json());

app.get('/books', async (req, res) => {
    try {
        const { genre, sort, page, limit } = req.query;
        const genreValue = typeof genre === "string" ? genre : undefined;
        const filter = genreValue && ["fantasy", "dystopian", "children", "classic"].includes(genreValue)
            ? { genre: genreValue as "fantasy" | "dystopian" | "children" | "classic" } : {};
        const total = await Book.countDocuments(filter);
        const currentPage = Number(page) || 1;
        const pageLimit = Number(limit) || 5;
        const skip = (currentPage - 1) * pageLimit;

        const books = await Book.find(filter).sort(typeof sort === "string" ? sort : "publishedYear")
            .skip(skip)
            .limit(pageLimit)
            .populate("author");

        res.json({
            total,
            page: currentPage,
            limit: pageLimit,
            data: books
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to get books",
        });
    }
});
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: "Failed to get book" });
    }
});

app.post('/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.json(newBook);

    } catch (error) {
        if (error instanceof Error && error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: "Failed to post books" });
    }
});

app.post("/authors", async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(201).json(newAuthor);

    } catch (error) {
        res.status(500).json({ error: "Faild to create author" });
    }

});

app.get("/authors", async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);

    } catch (error) {
        res.status(500).json({ error: "Faild to fetch authors" });

    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(updatedBook);

    } catch (error) {
        res.status(500).json({
            error: "Failed to update Books",
        });
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted", book: deletedBook });
    }

    catch (error) {
        res.status(500).json({
            error: "Failed to delete book",
        });
    }
});

app.get("/authors/:id/books", async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.id }).populate("author");
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to get authors books" });
    }

});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});




