// import gql
import { gql } from '@apollo/client';
// find user to login
export const FIND_USER = gql`
    {
        findUser {
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