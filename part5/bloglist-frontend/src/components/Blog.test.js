import React, {useState} from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


test('renders title and author', () => {
    const user= {id:121, username:'abc', name:'abc defg'}

    const blog = {
        user: 123,
        title: 'Component testing is done with react-testing-library',
        author: 'react developer',
        likes: 3,
        url: 'https://somewebsite.com'
    }

    const component = render(
        <Blog blog={blog} user={user}/>
    )
    const element = component.getByText(
        'https://somewebsite.com'
    )

    component.debug()
    console.log(prettyDOM(element))


    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('react developer')

    expect(element).toHaveStyle('display:none')

})



