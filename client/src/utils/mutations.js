// import gql
import { gql } from "@apollo/client";
// add user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
// login user
export const USER_LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
// add book
export const ADD_BOOK = gql`
    mutation addBook($bookData: InputBook!) {
        addBook(bookData: $bookData) {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;
// remove book
export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;