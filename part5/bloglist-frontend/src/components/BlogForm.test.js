import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const addBlog = jest.fn()
    const user = {id:1}

    const component = render(
        <BlogForm addBlog={addBlog} user={user}/>
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('#blogForm')

    fireEvent.change(titleInput, {
        target: { value: 'testing of forms could be easier' }
    })

    fireEvent.change(authorInput,{
        target: {value:'react Tester'}
    })
    fireEvent.change(urlInput,{
        target: {value: 'https://somewebsite.com'}
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
    expect(addBlog.mock.calls[0][0].author).toBe('react Tester' )
    expect(addBlog.mock.calls[0][0].url).toBe('https://somewebsite.com' )

})
