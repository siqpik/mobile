export default class Pic {
    id: string
    url: string
    likes: number
    date: any
    usersTag: string
    comments: Array<string>

    constructor(pic: Pic) {
        this.id = pic.id
        this.url = pic.url
        this.likes = pic.likes
        this.date = pic.date
        this.usersTag = pic.usersTag
        this.comments = pic.comments.reverse();
    }
}