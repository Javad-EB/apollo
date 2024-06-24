
import './App.css'
import { useMutation, useQuery } from '@apollo/client';
import { BOOK_FIELDS, GET_BOOKS } from './queries/books';
import { useState } from 'react';
import { ADD_BOOK } from './queries/addBooks'
import { gql } from '@apollo/client';

function App() {
const {loading, error, data} = useQuery(GET_BOOKS)
const[title, setTitle]= useState("")
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")

const [addBook] = useMutation(ADD_BOOK, {
  update(cache, { data: { addBook } }) {
    cache.modify({
      fields: {
        books(existingBooks = []) {
          const newBookRef = cache.writeFragment({
            data: addBook,
            fragment: gql`
              ${BOOK_FIELDS}
            `
          });
          return [...existingBooks, newBookRef];
        }
      }
    });
  }
})

if(loading) return <div>"Loading..."</div>
if(error) return <div>Error is :{error.message}</div>
console.log("data is :", data)
  return (
    <>
    <input type="text" name="title" id="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
    <input type="text" name="authorFirstName" id="authorFirstName" placeholder='Author FirstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    <input type="text" name="authorLastName" id="authorLastName" placeholder='Author LastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />

    <button type="button" onClick={() => {
      addBook({
        variables: {
          input:{
            title,
            author: {
              firstName,
              lastName,
            },
          },
        },
        optimisticResponse: {
          addBook: {
            id: Math.floor(Math.random() * 1000),
            __typename: "Book",
            title,
            author: {
              firstName,
              lastName
            },
          },
        },
      })    
    }}>Add</button>

    {data.books.map((book) => {
      return (
        <div key={book.id}>{book.title} by {book.author.firstName} {book.author.lastName}</div>
      )
    })}
    </>
  )
}

export default App
