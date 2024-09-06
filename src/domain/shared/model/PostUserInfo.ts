export default class PostUserInfo {
  username: String
  profilePicUrl: String
  displayName: String

  constructor(userInfo: PostUserInfo) {
    this.username = userInfo.username;
    this.displayName = userInfo.displayName;
    this.profilePicUrl = userInfo.profilePicUrl;
  }
}
