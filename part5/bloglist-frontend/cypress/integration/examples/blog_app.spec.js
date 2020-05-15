describe('Blog app', function() {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        const anotherUser = {
            name: 'Tellu Testaaja',
            username: 'tTest',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login').click
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('mluukkai logged in')

        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('vääräsalasana')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'wrong password or username')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'mluukkai logged in')

        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })
        it('A blog can be created', function() {
            cy.contains('add new blog').click()
            cy.get('#title').type('cypress test blog')
            cy.get('#author').type('cypress tester')
            cy.get('#url').type('https://newtestblog.com')
            cy.get('#create').click()
            cy.contains('a new blog cypress test blog by cypress tester succesfully added')
            cy.contains('cypress test blog cypress tester')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'another blog',
                    author: 'cypress',
                    url: 'www.test.com'
                })
            })

            it('it can be liked', function () {
                cy.get('#viewOrHide').click()
                cy.get('#like').click()
                cy.contains('Likes 1')
                cy.get('#like').click()
                cy.contains('Likes 2')
            })
            it('it can be deleted', function () {
                cy.get('#viewOrHide').click()
                cy.get('#remove-blog').click()
                cy.get('html').should('not.contain', 'another blog')
            })
            it('it can only be deleted by the creator when logged in',function () {
                cy.login({ username: 'tTest', password: 'salasana' })
                cy.get('#viewOrHide').click()
                cy.get('#remove-blog').should('not.be.visible')
            })
        })
        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'first blog', author: 'tester', url: 'www.1.com' })
                cy.createBlog({ title: 'second blog', author: 'tester', url:'www.2.com'})
                cy.createBlog({ title: 'third blog', author: 'tester' ,url:'www.3.com'})
                cy.createBlog({ title: 'fourth blog', author: 'tester' ,url:'www.4.com'})

            })

            it('blogs are shown ordered by likes', function () {
                cy.contains('first blog').parent().as('first')
                cy.get('@first').contains('view').click()
                cy.get('@first').contains('Likes 0')

                cy.contains('second blog').parent().as('second')
                cy.get('@second').contains('view').click()
                cy.get('@second').contains('like').click()
                cy.get('@second').contains('Likes 1')
                cy.get('@second').contains('like').click()
                cy.get('@second').contains('Likes 2')

                cy.contains('third blog').parent().as('third')
                cy.get('@third').contains('view').click()
                cy.get('@third').contains('like').click()
                cy.get('@third').contains('Likes 1')
                cy.get('@third').contains('like').click()
                cy.get('@third').contains('Likes 2')
                cy.get('@third').contains('like').click()
                cy.get('@third').contains('Likes 3')

                cy.contains('fourth blog').parent().as('fourth')
                cy.get('@fourth').contains('view').click()
                cy.get('@fourth').contains('like').click()
                cy.get('@fourth').contains('Likes 1')

                cy.visit('http://localhost:3000')
                cy.get('.blog').then( blogs => {
                    console.log('number of blogs', blogs.length)
                    cy.wrap(blogs[0]).contains('third blog')
                    cy.wrap(blogs[1]).contains('second blog')
                    cy.wrap(blogs[2]).contains('fourth blog')
                    cy.wrap(blogs[3]).contains('first blog')
                })
            })
        })
    })
})

