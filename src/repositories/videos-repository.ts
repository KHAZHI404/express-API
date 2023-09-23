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

    getVideoById(id: number) {
        return videos.find(v => v.id === id)
    },




}