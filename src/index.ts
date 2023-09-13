import express, {Request, Response} from 'express'
const app = express()
const port = 3000


const db = {
    videos: [{
        id: 1,
        title: 'title',
        author: 'author',
        canBeDownloaded: false,
        minAgeRestriction: 1,
        nullable: true,
        createdAt:	new Date(),
        publicationDate: new Date(),//+1
        availableResolutions: 'P2160'
    },
        {
            id: 2,
            title: 'title',
            author: 'author',
            canBeDownloaded: false,
            minAgeRestriction: 1,
            nullable: true,
            createdAt:	new Date(),
            publicationDate: new Date(),//+1
            availableResolutions: 'P2160'
        },

    ]}


app.get('/videos', (req: Request, res: Response) => {
    res.send(db.videos)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
