const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs =
    [
        { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
        { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
        { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
        { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
        { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
    ]

const rootUser = async () => {
    const passwordHash = await bcrypt.hash('sekret', 10)
    return new User({username: 'root', passwordHash})
}

const token = async () => {
    const user = await User.findOne({ username: 'root' })

    const userForToken = {
        username: 'root',
        id: user._id
    }

    return jwt.sign(userForToken, process.env.SECRET)
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon',url:'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const notValidToken = async () => {
    const user = new User ({username: 'someuser', password: 'somepassword'})
    await user.save()
    const userWithId = await User.findOne({ username: 'someuser' })
    const userForToken = {
        username: 'someuser',
        id: userWithId._id
    }
    return jwt.sign(userForToken, process.env.SECRET)
}


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const userId = async () => {
    const user = await usersInDb()
    return user[0].id
}

module.exports = {initialBlogs, rootUser, token, nonExistingId, blogsInDb, usersInDb, userId, notValidToken}
