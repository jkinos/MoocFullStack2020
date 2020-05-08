const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => {
        return sum + item
    }

    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const maxLikes = Math.max(...likes)
    return blogs.filter(blog => blog.likes===maxLikes)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map (blog => blog.author)
    const reducer = (map,val) => {
    map[val] = (map[val] || 0) + 1
        return map}
    const authorsAndBlogsObject = authors.reduce(reducer, {} )
    const keys = Object.keys(authorsAndBlogsObject)
    const values = Object.values(authorsAndBlogsObject)
    const maxBlogs = Math.max(...values)
    const indexes= []
    values.map(value => {if (value===maxBlogs){
        indexes.push(values.indexOf(value))}})
        return indexes.map(index=>({author:keys[index],blogs:maxBlogs}))
}

const mostLikes = (blogs) => {
    const bloglikes = blogs.map(blog => blog.likes)
    const blogsWithMostLikes = blogs.filter(blog => blog.likes=== Math.max(...bloglikes))

    return blogsWithMostLikes.map(blog =>
    ({"author": blog.author, "likes": blog.likes})
    )
}

module.exports = {
    dummy,totalLikes,favoriteBlog, mostBlogs, mostLikes
}

