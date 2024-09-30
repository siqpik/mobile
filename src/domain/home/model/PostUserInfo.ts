export default class PostUserInfo {
    username: string
    profilePicUrl: string
    displayName: string

    constructor(userInfo: PostUserInfo) {
        this.username = userInfo.username;
        this.displayName = userInfo.displayName;
        this.profilePicUrl = userInfo.profilePicUrl;
    }
}