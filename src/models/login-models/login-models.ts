
export type LoginInputModel = {
    loginOrEmail: string
    password: string
}

export type LoginSuccesViewModel = {
    accessToken: string //JWT access token
}