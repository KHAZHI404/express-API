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
}