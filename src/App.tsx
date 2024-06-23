
import './App.css'
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from './queries/books';


function App() {
const {loading, error, data} = useQuery(GET_BOOKS)
if(loading) return <div>"Loading..."</div>
if(error) return <div>Error is :{error.message}</div>
console.log("data is :", data)
  return (
    <>
    {data.books.map((book) => {
      return (
        <div key={book.id}>{book.title} by {book.author.firstName} {book.author.lastName}</div>
      )
    })}
    </>
  )
}

export default App
