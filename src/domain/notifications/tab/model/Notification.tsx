export default class Notification {
    id: string
    userInfo: UserInfo
    type: NotificationType
    notifiableId: string
    date: any
    admireRequestStatus: AdmireRequestStatus
    notificationStatus: NotificationStatus

    constructor(notification: { id: string; type: any; status: any; date: any }, admireRequest: {
        senderInfo: { userName: string; profilePicUrl: string };
        id: string;
        status: any
    }) {
        this.id = notification.id;
        this.userInfo = new UserInfo(admireRequest.senderInfo);
        this.type = notification.type;
        this.notifiableId = admireRequest.id;
        this.date = notification.date;
        this.admireRequestStatus = admireRequest.status
        this.notificationStatus = notification.status
    }
}

class UserInfo {
    username: string
    profilePicUrl: string

    constructor(json: { userName: string; profilePicUrl: string; }) {
        this.username = json.userName
        this.profilePicUrl = json.profilePicUrl
    }
}

export enum NotificationType {
    REQUEST = 'REQUEST',
    COMMENT = 'COMMENT',
    LIKE = 'LIKE',
    TAG = 'TAG'
}

export enum NotificationStatus {
    NEW = 'NEW',
    OLD = 'OLD',
    READ = 'READ'
}

export enum AdmireRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DISMISSED = 'DISMISSED'
}