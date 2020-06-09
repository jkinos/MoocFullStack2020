import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ADD_BOOK, ALL_AUTHORS, BOOKS_BY_GENRE} from '../queries'
import Notify from "./Notify";

const NewBook = ({show,setError, errorMessage, updateCacheWith}) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [refetchQueries, setRefetchQueries] = useState([{query: ALL_AUTHORS}])

  const [ addBook ] = useMutation(ADD_BOOK, {refetchQueries: refetchQueries,
    onError: (error) => {
      setError('something went terribly wrong')
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  if (!show) {
    return null
  }

  const submit =  (event) => {
    event.preventDefault()
    const publishedToInt= parseInt(published)

    addBook({
      variables: { title, published: publishedToInt, author, genres }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setRefetchQueries(refetchQueries.concat({query:BOOKS_BY_GENRE, variables: {genre: genre}}))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook