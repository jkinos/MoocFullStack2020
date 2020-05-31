import React, {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR} from '../queries'


const Authors = (props) => {
  const [name,setName]=useState('')
  const [born, setBorn]=useState('')
  const result = useQuery(ALL_AUTHORS)
  const authors = () => result.data.allAuthors

  const [ setBornYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS} ],
  })
console.log('name',name,'born',born)
  const submit = async (event) => {
    event.preventDefault()
    if(name===''){
      setName(authors()[0].name)
    }
    const bornToInt= parseInt(born)

    setBornYear({
      variables: { name, setBornTo:bornToInt }
    })

    setName('')
    setBorn('')
  }


  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  const options = authors().map(a =>   <option key={a.id} value={a.name}>{a.name}</option>)


  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors().map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:
          <select  value={name} onChange={({target})=>setName(target.value)}>
          {options}
        </select>
        </div>
        <div>
          born:
          <input  value={born} type='number' onChange={({target})=>setBorn(target.value)}/></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
