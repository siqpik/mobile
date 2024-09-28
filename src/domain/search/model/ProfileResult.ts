export default class ProfileResult {
    name: string
    userName: string
    avatarUrl: string

    constructor(json) {
        this.name = json.displayName
        this.userName = json.userName
        this.avatarUrl = json.profilePicUrl
    }
}