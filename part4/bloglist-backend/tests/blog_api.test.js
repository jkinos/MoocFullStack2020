const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = await helper.rootUser()
        await user.save()
    })

    test('user creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('users post request fails with status code 400 if username is shorter than 3 characters', async () => {
        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(1)
    })

    test('users post request fails with status code 400 if username is not unique', async () => {
        const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(1)
    })

    test('users post request fails with status code 400 if username is missing', async () => {
        const newUser = {
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(1)
    })

    test('users post request fails with status code 400 if password is missing', async () => {
        const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(1)
    })

    test('users post request fails with status code 400 if password is shorter than 3 characters', async () => {
        const newUser = {
            username: 'mluukkai',
            password: 's',
            name: 'Matti Luukkainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const users = await helper.usersInDb()
        expect(users.length).toBe(1)
    })

    test('login succeeds with an existing username', async () => {

        const oldUser = {
            username: 'root',
            password: 'sekret',
        }

        const response = await api
            .post('/api/login')
            .send(oldUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.token).toBeDefined()
        console.log('token: ', response.body.token)
    })

    test('login fails with wrong password', async () => {

        const oldUser = {
            username: 'root',
            password: 'wrong password',
        }

        await api
            .post('/api/login')
            .send(oldUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('login fails with wrong username', async () => {

        const nonExistingUser = {
            username: 'wrong username',
            password: 'sekret',
        }

        await api
            .post('/api/login')
            .send(nonExistingUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    describe('when there is initially some blogs saved', () => {
        beforeEach(async () => {
            await Blog.deleteMany({})
            await Blog.insertMany(helper.initialBlogs)
        })

        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            await api
                .get('/api/blogs')
                .expect(200)

            const response = await helper.blogsInDb()
            expect(response).toHaveLength(helper.initialBlogs.length)
        })

        test('a specific blog is within the returned blogs', async () => {
            const response = await api.get('/api/blogs')

            const titles = response.body.map(r => r.title)
            expect(titles).toContain(
                'Canonical string reduction'
            )
        })

        test('id is returned as "id"', async () => {
            const response = await helper.blogsInDb()
            expect(response[0].id).toBeDefined()
        })


        describe('addition of a new blog', () => {
            test('a valid blog can be added ', async () => {
                const token = await helper.token()

                const newBlog = {
                    title: "Type wars",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                    likes: 2
                }

                await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newBlog)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

                const response = await helper.blogsInDb()
                expect(response).toHaveLength(helper.initialBlogs.length + 1)
                const title = response.map(r => r.title)
                expect(title).toContain(
                    'Type wars'
                )
            })

            test('if likes is undefined, likes is set to 0"', async () => {
                const token = await helper.token()
                const newBlog = {
                    title: "Type wars",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                }

                await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newBlog)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

                const response = await helper.blogsInDb()
                expect(response[helper.initialBlogs.length].likes).toBe(0)
            })

            test('post request without title fails with status code 400', async () => {
                const token = await helper.token()
                const newBlog = {
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                    author: "Robert C. Martin",
                    likes: 2,
                }

                await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newBlog)
                    .expect(400)
                    .expect('Content-Type', /application\/json/)
            })

            test('post request without url fails with status code 400', async () => {
                const token = await helper.token()
                const newBlog = {
                    title: "Type wars", author: "Robert C. Martin",
                    likes: 2
                }

                await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newBlog)
                    .expect(400)
                    .expect('Content-Type', /application\/json/)
            })
        })

        describe('viewing a specific blog', () => {
            test('succeeds with a valid id', async () => {
                const blogsAtStart = await helper.blogsInDb()
                const blogToView = blogsAtStart[0]

                const resultBlog = await api
                    .get(`/api/blogs/${blogToView.id}`)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

                expect(resultBlog.body).toEqual(blogToView)
            })

            test('fails with statuscode 404 if blog does not exist', async () => {
                const validNonexistingId = await helper.nonExistingId()

                console.log(validNonexistingId)

                await api
                    .get(`/api/blogs/${validNonexistingId}`)
                    .expect(404)
            })

            test('fails with statuscode 400 if id is invalid', async () => {
                const invalidId = '5a3d5da59070081a82a3445'

                await api
                    .get(`/api/blogs/${invalidId}`)
                    .expect(400)
            })
        })

            describe('deletion of a blog', () => {
                test('succeeds with status code 204 if id is valid and token is valid', async () => {
                    const token = await helper.token()
                    const newBlog = {
                        title: "Type wars",
                        author: "Robert C. Martin",
                        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                        likes: 2
                    }

                    await api
                        .post('/api/blogs')
                        .set('Authorization', `Bearer ${token}`)
                        .send(newBlog)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

                    const response = await helper.blogsInDb()
                    expect(response).toHaveLength(helper.initialBlogs.length + 1)
                    const blogToDelete = response[helper.initialBlogs.length]

                    await api
                        .delete(`/api/blogs/${blogToDelete.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .expect(204)

                    const blogsAtEnd = await helper.blogsInDb()
                    expect(blogsAtEnd).toHaveLength(
                        helper.initialBlogs.length
                    )

                    const titles = blogsAtEnd.map(r => r.title)
                    expect(titles).not.toContain(blogToDelete.title)
                })

                test('deletion fails if token is missing', async () => {
                    const validToken = await helper.token()
                    const newBlog = {
                        title: "Type wars",
                        author: "Robert C. Martin",
                        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                        likes: 2
                    }

                    await api
                        .post('/api/blogs')
                        .set('Authorization', `Bearer ${validToken}`)
                        .send(newBlog)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

                    const response = await helper.blogsInDb()

                    expect(response).toHaveLength(helper.initialBlogs.length + 1)
                    const blogToDelete = response[helper.initialBlogs.length]

                    await api
                        .delete(`/api/blogs/${blogToDelete.id}`)
                        .expect(401)

                    const blogsAtEnd = await helper.blogsInDb()

                    expect(blogsAtEnd).toHaveLength(
                        helper.initialBlogs.length + 1
                    )

                    const titles = blogsAtEnd.map(r => r.title)
                    expect(titles).toContain(blogToDelete.title)
                })

                test('deletion fails with status code 401 if id is valid but token is not valid', async () => {
                    const validToken = await helper.token()
                    const newBlog = {
                        title: "Type wars",
                        author: "Robert C. Martin",
                        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                        likes: 2
                    }

                    await api
                        .post('/api/blogs')
                        .set('Authorization', `Bearer ${validToken}`)
                        .send(newBlog)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

                    const response = await helper.blogsInDb()

                    expect(response).toHaveLength(helper.initialBlogs.length + 1)
                    const blogToDelete = response[helper.initialBlogs.length]
                    const notValidToken = await helper.notValidToken()

                    await api
                        .delete(`/api/blogs/${blogToDelete.id}`)
                        .set('Authorization', `Bearer ${notValidToken}`)
                        .expect(401)

                    const blogsAtEnd = await helper.blogsInDb()

                    expect(blogsAtEnd).toHaveLength(
                        helper.initialBlogs.length + 1
                    )

                    const titles = blogsAtEnd.map(r => r.title)
                    expect(titles).toContain(blogToDelete.title)
                })
            })
        })
    })


afterAll(() => {
    mongoose.connection.close()
})
