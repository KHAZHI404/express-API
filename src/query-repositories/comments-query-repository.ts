import {ObjectId, WithId} from "mongodb";
import {commentsCollection} from "../db/db";
import {CommentDbModel, commentMapper} from "../models/comments-model/comments-models";


export const commentsQueryRepository = {
    async getCommentById(id: string) {
        if (!ObjectId.isValid(id)) return null
        const comment: WithId<CommentDbModel> | null = await commentsCollection.findOne(
            {_id: new ObjectId(id)})
        return comment ? commentMapper(comment) : null
    },

    async getCommentsForPost(id: string,
                          pageNumber: number,
                          pageSize: number,
                          sortBy: string,
                          sortDirection: string) {
        try {
            if (!ObjectId.isValid(id)) return null
            const sortOptions: any = []
            sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1
            const filter = {blogId: id}

            const totalCount = await commentsCollection.countDocuments(filter)
            const pagesCount = Math.ceil(totalCount / pageSize)
            const scip = (pageNumber - 1) * pageSize
            const comments = await commentsCollection
                .find(filter)
                .sort(sortOptions)
                .limit(pageSize)
                .skip(scip)
                .toArray()

            return comments ? {
                pagesCount,
                pageNumber,
                pageSize,
                totalCount,
                items: comments.map(commentMapper) //posts.map((post) => postMapper(post))
            } : null
        } catch (e) {
            return e
        }
    },
}