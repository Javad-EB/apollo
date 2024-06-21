
import './App.css'
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from './queries/characters';


function App() {
const {loading, error, data} = useQuery(GET_CHARACTERS)
if(loading) return <div>"Loading..."</div>
if(error) return <div>Error is :{error.message}</div>
console.log("data is :", data)
  return (
    <>
    {data.characters.results.map((character) => {
      return (
        <div key={character.id}>{character.name}</div>
      )
    })}
    </>
  )
}

export default App
