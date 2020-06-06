import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ALL_BOOKS, ADD_BOOK, ALL_AUTHORS, FAVORITE_GENRE} from '../queries'
import Notify from "./Notify";

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS},{query: ALL_AUTHORS},{query: FAVORITE_GENRE}],
    onError: (error) => {
      props.setError('something went terribly wrong')
    }
  })


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
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
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={props.errorMessage} />
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