import PostUserInfo from "@/src/domain/home/model/PostUserInfo";

export class User {
    isLoggedUser: boolean
    amIAdmirer: boolean
    hasPendingRequest: boolean
    displayName: string
    userName: string
    profilePicUrl: string
    admirersCount: number
    admiredCount: number
    postsCount: number

    constructor(json: any) {
        this.isLoggedUser = json.isLoggedUser
        this.amIAdmirer = json.amIAdmirer
        this.hasPendingRequest = json.hasPendingRequest
        this.displayName = json.displayName
        this.userName = json.userName
        this.profilePicUrl = json.profilePicUrl
        this.admirersCount = json.admirersCount
        this.admiredCount = json.admiredCount
        this.postsCount = json.postsCount
    }
}