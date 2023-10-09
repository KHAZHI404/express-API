import {videos} from "../../db/db";
import {h01CreateVideoInputModel, h01UpdateVideoInputModel, h01Video} from "../videos-models/videos-models";


export const videosRepository = {

    async findVideos(title: string | null | undefined): Promise<h01Video[]> {
        if (title) {
            return videos.filter(v => v.title.indexOf(title) > -1) //зачем этот минус 1?
        }
        return videos
    },

    async findVideoById(id: string): Promise<h01Video | undefined> {
        return videos.find(v => v.id === id)
    },

    async createVideo(body: h01CreateVideoInputModel): Promise<h01Video> {
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


    async updateVideo(id: string, body: h01UpdateVideoInputModel): Promise<boolean> {
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

    async deleteVideo(id: string): Promise<boolean> {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    },

    async deleteAll(): Promise<void> {
        videos.splice(0, videos.length)
    }

}