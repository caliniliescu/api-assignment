currently we pass author as a string when we create a comment.
we want to be able to track our authors so we want to:
1. be able to create new author records using the graphql api
2. update the existing comment resolver to return an author object on the comment 