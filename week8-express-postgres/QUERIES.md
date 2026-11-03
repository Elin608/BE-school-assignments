# Skill 5 - SQL Queries
## GET /authors/1/books 
### Sequelize SQL
Executing (default): SELECT "id", "title", "genre", "publisher_year", "author_id" FROM "books" AS "Book" WHERE "Book"."author_id" = 1;
### My own SQL
SELECT * FROM books WHERE author_id=1;
Select * FROM "Authors" INNER JOIN books ON "Authors".id=books.author_id WHERE "Authors".id =1

## GET /members/1/loans
### Sequelize SQL
Executing (default): SELECT "id", "member_id", "book_id", "loan_date" FROM "loans" AS "Loan" WHERE "Loan"."member_id" = 1;
### My own SQL
 SELECT * FROM members INNER JOIN loans ON members.id = loans.members_id
 INNER JOIN books ON loans.book_id = books.id WHERE members.id = 1

 Sequelize use LEFT OUTER JOIN by default with include. This allows to use authors even if they have no books. 

 Sequelize use alias and specific columns names. My SQL use SELECT * and is simpler to read. 