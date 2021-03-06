import React, {useState} from 'react'
import {useLazyQuery, useQuery} from '@apollo/client'
import {ALL_BOOKS, BOOKS_BY_GENRE} from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre,setGenre] = useState(null)
  const [queryByGenre, genreResult]=useLazyQuery(BOOKS_BY_GENRE)

  if (!props.show) {
    return null
  }

  if (result.loading || genreResult.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const getBooksByGenre =  (g) => {
    queryByGenre({variables: { genre: g }})
    setGenre(g)
  }

  const resetGenre = () => {
    setGenre(null)
  }

  const genrebuttons=()=> {
    const genres = books.map(book => book.genres)
    const tmp = [];
    // eslint-disable-next-line array-callback-return
    const uniqueGenreArrays = genres.filter((g) => {
      if (tmp.indexOf(g.toString()) < 0) {
        tmp.push(g.toString());
        return g;
      }
    })
      const genresInSameArray = uniqueGenreArrays.reduce((acc, cur) => [...acc, ...cur])
      const uniqueGenres = [...new Set(genresInSameArray)]

    return (
    <div>
      <button onClick={resetGenre}>All genres</button>
      {uniqueGenres.map(g=>
          <button key={g} onClick={()=>getBooksByGenre(g)}>{g}</button>)
      }
    </div>
    )
  }

  const booksToShow =()=> {
    if (!genre) {
      return (
          books.map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )
      )
    }
    if (genreResult.data) {
      return (
          genreResult.data.allBooks.map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
      )
    }
  }

  const genreHeading = () => {
    if(!genre){
      return''
    }
    return <p>in genre <span><b>{genre}</b></span></p>

  }
  return (
    <div>
      <h2>genres</h2>
      {genrebuttons()}
      <h2>books</h2>
      {genreHeading()}
      <table>
          <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow()}
    </tbody>
    </table>
    </div>
  )

}

export default Books