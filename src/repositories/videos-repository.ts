import {HTTP_STATUSES} from "../index";

export let videos = [{id: 1, title: 'Name 1', author: 'Author 1'}, {id: 2, title: 'Name 2', author: 'Author 2'}]

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
            author: author
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