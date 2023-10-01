import {videos} from "../db/db";
import {h01CreateVideoInputModel, h01UpdateVideoInputModel, h01Video} from "../types/types";


export const videosRepository = {
    findVideos(title: string | null | undefined) {
        if (title) {
            return videos.filter(v => v.title.indexOf(title))
        }
        return videos
    },

    createVideo(title: string, author: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded: true,
            minAgeRestriction: 123,
            createdAt: 'string',
            publicationDate: 'string',
            availableResolutions: 'P240',
        }
        videos.push(newVideo)
        return newVideo
    },

    findVideoById(id: number) {
        return videos.find(v => v.id === id)
    },

    updateVideo(id: number, title: string, author: string) {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = title
            video.author = author
            return true
        }
        return false
    },

    deleteVideo(id: number) {
        for (let i=0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    }

}