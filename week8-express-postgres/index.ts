import express from "express";
import dotenv from "dotenv";
import sequelize from './sequelize.js';
import Book from './models/books.js';
import Author from './models/authors.js';
import Member from './models/Member.js';
import Loan from './models/Loan.js';

dotenv.config();

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

Member.belongsToMany(Book, { through: Loan, foreignKey: 'member_id', otherKey: 'book_id' });
Book.belongsToMany(Member, { through: Loan, foreignKey: 'book_id', otherKey: 'member_id' });

const app = express();
app.use(express.json());

const dataDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await sequelize.sync();
    console.log('Database synced!');
};

dataDbConnection();

app.get('/books', async (req, res) => {
    const genre = req.query.genre;
    const sortBy = req.query.sort;
    const allowedSorts = ['title', 'publisher_year', 'genre'];
    if (sortBy && !allowedSorts.includes(sortBy as string)) {
        return res.status(400).json({ error: 'Invalid sort' });
    }
    const orderBy = sortBy ? String(sortBy) : 'id';


    const books = await Book.findAll({
        where: genre ? { genre } : {},
        order: [[orderBy, 'ASC']], include: Author,
    });
    res.json(books);
});


app.get('/books/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });

        return;
    }
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

app.post('/books', async (req, res) => {
    const { title, genre, publisher_year, author_id } = req.body;

    try {

        const book = await Book.create({ title, genre, publisher_year, author_id });
        res.status(201).json(book);
    } catch (error: any) {
        if (error.code === '23503') { // foreign key violation
            return res.status(400).json({ error: 'Author does not exist' });
        }
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.patch('/books/:id', async (req, res) => {

    const id = Number(req.params.id);
    const { title, genre, publisher_year, author_id } = req.body;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No data provided' });
    }
    const existingBook = await Book.findByPk(id);
    if (!existingBook) {
        return res.status(404).json({ error: 'Book not found' });
    }
    await existingBook.update({ ...(title !== undefined && { title }), ...(genre !== undefined && { genre }), ...(publisher_year !== undefined && { publisher_year }), ...(author_id !== undefined && { author_id }) });
    res.status(200).json(existingBook)
});


app.delete('/books/:id', async (req, res) => {
    const id = Number(req.params.id);
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.status(204).send();
});



app.get('/authors', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});
app.post('/authors', async (req, res) => {
    const { name } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
    }
    try {
        const author = await Author.create({ name });
        res.status(201).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/authors/:id/books', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        const books = await Book.findAll({ where: { author_id: id } });
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/loans', async (req, res) => {
    const { member_id, book_id } = req.body;
    if (!member_id || !book_id) {
        return res.status(400).json({ error: 'member_id and book_id are required' });
    }
    try {
    const member = await Member.findByPk(member_id);
    const book = await Book.findByPk(book_id);
    if (!member || !book) {
        return res.status(404).json({ error: 'Member or Book not found' });
    }

    const loan = await Loan.create({ member_id, book_id, loan_date: new Date() });
    res.status(201).json(loan);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
}
});

app.get ('/members', async (req, res) => {
    try{
        const members = await Member.findAll();
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/members', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const member = await Member.create({ name });
        res.status(201).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/members/:id/loans', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const member = await Member.findByPk(id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        const loans = await Loan.findAll({ where: { member_id: id } });
        res.json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(Number(process.env.PORT), () => {
    console.log("Server is running on port 3000");
});



