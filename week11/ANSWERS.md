#Week 11 - Sentry

## Exercise 1
### Question 1
Sentry must start first so it can catch errors from the beginning. 
### Question 2
To keep the DSN private and easy to change. 

## Exercise 2
### Question 
Sentry shows the error, when and where it happend, Node.js version,Windows, environment and where in the code the error is. 

## Exercise 3
### Question 
Sentry did not catch the error because the error handler was before the routes.

## Exercise 4
### Question 1
try/catch already catches errors. We need captureException to send them to Sentry. 
### Question 2
Sentry groups similar errors togehter. That makes it easier to find and fix them. 

## Exercise 5
### Question 
Breadcrumb shows what happend before an error. It helps to see which route was used.
Tag helps to find errors from a specific feature, like books.

## Exercise 6
### Question 

