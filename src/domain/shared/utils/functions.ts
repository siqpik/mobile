import {deleteItem, post} from "@/src/domain/service/ApiService";

export const shortenName = (name: string) => name.length > 9
    ? name.slice(0, 7) + '...'
    : name

export const togglePostReactionOnFeed = (
    postId: string,
    toDelete: boolean,
    onUnReacting: () => any,
    onSuccessUnReacting: (postId: string) => any,
    onErrorUnReacting: () => any,
    onReacting: () => any,
    onSuccessReacting: (postId: string) => any,
    onErrorReacting: () => any) => {
    if (toDelete) {
        onUnReacting()
        deleteItem('/post/' + postId + '/reaction')
            .then(() => {
                onSuccessUnReacting(postId)
            })
            .catch(error => {
                onErrorUnReacting()
                alert('You can not un-react this post now: ' + error)
            })
    } else {
        onReacting()
        post('/post/' + postId + '/reaction')
            .then(() => {
                onSuccessReacting(postId)
            })
            .catch(error => {
                onErrorReacting()
                alert('You can not like this post now\': ' + error)
            })
    }
}