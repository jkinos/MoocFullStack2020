const listHelper = require('../utils/list_helper')

describe ('blogs', () =>
{
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    test('totalLikes returns three', () => {

        const blogs =
            [
            {
            "title": "Chococlili",
            "author": "Elina Innanen",
            "url": "https://chocochili.net/",
            "likes": 1,
            "id": "5e9593a1782b883c70d3d95e"
            },
            {
                "title": "Pidempi korsi",
                "author": "Paula",
                "url": "https://pidempikorsi.tumblr.com/",
                "likes": 2,
                "id": "5e959490782b883c70d3d95f"
            }
            ]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(3)
    })

    test('favoriteBlog returns "Canonical string reduction" -blog', () => {
        const blogs =
            [
                { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
                { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
                { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
                { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
                { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
                { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
                ]

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(
            [{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }]
        )
    })

    test ('mostBlogs returns [{author: "Robert C Martin", Blogs: 3}]', () => {
        const blogs =
            [
                {
                    _id: "5a422a851b54a676234d17f7",
                    title: "React patterns",
                    author: "Michael Chan",
                    url: "https://reactpatterns.com/",
                    likes: 7,
                    __v: 0
                },
                {
                    _id: "5a422aa71b54a676234d17f8",
                    title: "Go To Statement Considered Harmful",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes: 5,
                    __v: 0
                },
                {
                    _id: "5a422b3a1b54a676234d17f9",
                    title: "Canonical string reduction",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                    likes: 12,
                    __v: 0
                },
                {
                    _id: "5a422b891b54a676234d17fa",
                    title: "First class tests",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                    likes: 10,
                    __v: 0
                },
                {
                    _id: "5a422ba71b54a676234d17fb",
                    title: "TDD harms architecture",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                    likes: 0,
                    __v: 0
                },
                {
                    _id: "5a422bc61b54a676234d17fc",
                    title: "Type wars",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                    likes: 12,
                    __v: 0
                }
            ]
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(
            [{author: "Robert C. Martin", blogs: 3}]
        )
    })

        test ('mostLikes returns [{author: "Edsger W. Dijkstra",likes: 12}]', () => {
            const blogs =
                [
                    { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 , userId: "5e9dbdcb6202c42ae44b85dd"},
                    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 , userId: "5e9dbdcb6202c42ae44b85dd" },
                    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 , userId: "5e9dbdcb6202c42ae44b85dd" },
                    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 , userId: "5e9dbdcb6202c42ae44b85dd"},
                    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 , userId: "5e9dbdcb6202c42ae44b85dd"},
                    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 , userId: "5e9dbdcb6202c42ae44b85dd"}
                ]
            const result = listHelper.mostLikes(blogs)
            expect(result).toEqual(
                [{
                    author: "Edsger W. Dijkstra",
                    likes: 12
                }]
            )
    })
})