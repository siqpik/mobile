import PostUserInfo from "./PostUserInfo";

export default class Post {
    id: string
    userInfo: PostUserInfo
    date: Date
    likesCount: number
    commentsCount: string
    statement: string
    mediaUrl: string
    comments: []
    likes: []
    iReacted: boolean

    constructor(json) {
        this.id = json.id
        this.userInfo = new PostUserInfo(json.userInfo)
        this.date = json.date
        this.likesCount = json.reactionsCount
        this.commentsCount = json.commentsCount
        this.statement = json.statement
        this.mediaUrl = json.mediaUrl
        this.comments = []
        this.likes = []
        this.iReacted = json.iReacted
    }
}