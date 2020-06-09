import React, {useEffect} from "react";
import {useLazyQuery, useQuery} from '@apollo/client'
import {BOOKS_BY_GENRE, FAVORITE_GENRE} from '../queries'

const Recommend = (props) => {
    const genreResult = useQuery(FAVORITE_GENRE)
    const [getRecommendations, result] = useLazyQuery(BOOKS_BY_GENRE)
    const genre = () => genreResult.data.me.favoriteGenre.toLowerCase()
    const books = () => result.data.allBooks

    useEffect(() => {
        if(genreResult.data ){
            getRecommendations({
            variables: { genre: genre() }
        })
            console.log(result)
        }
//eslint-disable-next-line
    },[genreResult.data])

    if (!props.show) {
        return null
    }

    if ( genreResult.loading|| result.loading)  {
        return <div>loading...</div>
    }

    const booksToShow = () => {
        if(books().length!==0 ) {
            return (
                books().map(b =>
                    <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>)
            )
        }
        console.log('result', result)
        return 'books loading..'
    }
    const genreText = () => {
        return <p>books in your favorite genre <span><b>{genre()}</b></span></p>
    }

    return( <div>
            <h2>recommendations</h2>
            {genreText()}
            <table>
                <thead>
                <tr>
                    <th> </th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                </thead>
                <tbody>
                {booksToShow()}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend