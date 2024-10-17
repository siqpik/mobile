export default class ProfilePost {
    id: string
    mediaUrl: string
    date: Date
    reactionsCount: number
    iReacted: boolean

    constructor(json: any) {
        this.id = json.id
        this.mediaUrl = json.mediaUrl
        this.date = json.date
        this.reactionsCount = json.reactionsCount
        this.iReacted = json.iReacted
    }
}