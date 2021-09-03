Our graphql app currently supports adding comments with authors as strings. Because of new requirements, we have to be able to keep track of all our authors.
Refactor the code so that we can:
1. Be able to create new author records using the graphql api. Authors need to have the following fields: firstname, lastname, email.
2. Update the existing comment resolver to accept a reference to an author when creating a new comment and to return an author object instead of string when querying for comments.

Run the server using ```npm start```