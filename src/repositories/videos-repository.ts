import {videos} from "../db/db";
import {h01CreateVideoInputModel, h01UpdateVideoInputModel, h01Video} from "../models/videos-models/videos-models";


export const videosRepository = {

    findVideos(title: string | null | undefined): h01Video[] {
        if (title) {
            return videos.filter(v => v.title.indexOf(title) > -1) //зачем этот минус 1?
        }
        return videos
    },

    findVideoById(id: string): h01Video | undefined {
        return videos.find(v => v.id === id)
    },

    createVideo(body: h01CreateVideoInputModel) {
        const newVideo: h01Video = {
            id: new Date().toISOString(),
            title: body.title,
            author: body.author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString() + 1,
            availableResolutions: 'P1440',
        }
        videos.push(newVideo)
        return newVideo
    },


    updateVideo(id: string, body: h01UpdateVideoInputModel) {
        const video: h01Video | undefined = videos.find(v => v.id === id)
        if (video) {
            video.title = body.title
            video.author = body.author
            video.availableResolutions = body.availableResolutions || video.availableResolutions
            video.canBeDownloaded = body.canBeDownloaded || video.canBeDownloaded
            video.minAgeRestriction = body.minAgeRestriction || video.minAgeRestriction
            video.publicationDate = body.publicationDate || video.publicationDate
            return true
        }
        return false
    },

    deleteVideo(id: string) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    },

    deleteAll() {
        videos.splice(0, videos.length)
    }

}