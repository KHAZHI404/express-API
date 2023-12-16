import {ObjectId} from "mongodb";
import {commentsCollection} from "../db/db";


export const commentsRepository = {

    async updateComment(id: string, body: any): Promise<any> {
        if(!ObjectId.isValid(id)) return false
        const result = await commentsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                content: body.content,
                commentatorInfo: {
                    userId: body.commentatorInfo.userId,
                    userLogin: body.commentatorInfo.userLogin
                },
                createdAt: body.createdAt
            }
        })
        return result.matchedCount === 1
    },

    async deleteComment(id: string): Promise<boolean> {
        if(!ObjectId.isValid(id)) return false
        const result = await commentsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAll() {
        const result = await commentsCollection.deleteMany({})
    },

}