import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    async sendEmailRecoveryMessage(user: any) {
        await emailAdapter.sendEmail(user.email, user.subject, user.message)
    }
}