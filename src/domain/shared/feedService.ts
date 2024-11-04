import {getJson} from "@/src/domain/service/ApiService";
import Post from "@/src/domain/home/model/Post";

export const fetchFeed = (page: number, onSearching: (() => void), onSuccess: ((arg0: any) => any), onError: (() => void)) => {
    onSearching()
    getJson(`/feed/${page}`)
        .then(json => json.map((post: any) => new Post(post)))
        .then(newPosts => onSuccess(newPosts))
        .catch(error => {
                console.log("error fetching feed: " + error)
                onError()
            }
        )
}