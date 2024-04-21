export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    MONGO_URI: process.env.MONGO_URL || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || "123",
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
        USERS: '/users',
        COMMENTS: '/comments',
        AUTH: '/auth',
        EMAIL: '/email',

    }
}



export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    NOT_AUTHORIZED_401: 401,
}

