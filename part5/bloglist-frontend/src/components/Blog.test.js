import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog/>', ()=> {
    let component
    const mockHandler = jest.fn()

    beforeEach(()=>{
        const user = {id: 121, username: 'abc', name: 'abc defg'}

        const blog = {
            id:1,
            user: 123,
            title: 'Component testing is done with react-testing-library',
            author: 'react developer',
            likes: 3,
            url: 'https://somewebsite.com'
        }

        component = render(
            <Blog blog={blog} user={user} like={mockHandler}/>
        )
    })

    test('renders title and author', () => {
        component.debug()
        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(component.container).toHaveTextContent('react developer')

    })
    test('renders url, likes and user..', () => {
        expect(
            component.container.querySelector('.showOrHide')
        ).toBeDefined()
    })

    test('url, likes and user are not displayed at first', () => {
        const element = component.container.querySelector('.showOrHide')
        console.log(prettyDOM(element))
        expect(element).toHaveStyle('display:none')

    })

    test('after clicking the button, url, likes and user are displayed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.showOrHide')
        expect(div).not.toHaveStyle('display: none')
    })

    test('blog details can be closed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const closeButton = component.getByText('hide')
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.showOrHide')
        expect(div).toHaveStyle('display: none')
    })

    test('clicking the like button twice calls event handler twice', async () => {

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})




