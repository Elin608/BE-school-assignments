### Skill 1: Understand the ORM
1. Sequilize translate JavaScript code into SQL queries so we can communicate with the database.

2. ORM= Object-Relational Mapping. Objects is used in our code, relational means database tables and mapping connect them. 

3. Book.findAll() gets all books: SELECT * FROM books;
   BOOK.findByPk(3) gets the book with ID 3: SELECT * FROM books WHERE id = 3;

4. Host: tells where the database is.
   Port: tells wich port to connect to.
   Dialect:tells Sequelize which database type we use. 
   Logging shows the SQL queries in the terminal. 

5. Sequelize.sync() creats tables if they dont exist. 
   Force: true deletes and recreates the tables. We should not use it with real data because we could lose important info. 

6. Plain SQL can be better for complex queries. It gives more control and can sometimes be faster. 


### Skill 4-Loan date
** Why does the loan date belong in the loans table?
Because in the loans table it shows when a specific member borrowed a specific book. The same book can be borrowed many times on diffirent dates. 