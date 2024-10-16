import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import WallPost from './components/Post';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthenticationService";
import {
    errorLikingPost,
    errorSearchingFeed,
    errorUnReactingPost,
    likingPost,
    reset,
    searchingFeed,
    successLikingPost,
    successSearchingFeed,
    successUnReactingPost,
    unReactingToPost
} from "./modules/feedSlice";
import {useAppDispatch, useAppSelector} from "../../config/hooks";
import {fetchFeed} from "@/src/domain/home/modules/feedService";
import {getFormattedDate, togglePostReaction} from "@/src/domain/shared/utils/functions";

export default props => {

    const {posts, page} = useAppSelector(store => store.feed)
    const dispatch = useAppDispatch()

    const [loggedUsername, setLoggedUsername] = useState<string>("");
    const [refreshing, setRefreshing] = useState(false);

    const wait = timeout => {
        return new Promise(resolve => {
            getFeed()
            setTimeout(resolve, timeout);
        });
    }

    const getFeed = () => fetchFeed(
        page, () => dispatch(searchingFeed()),
        (payload) => dispatch(successSearchingFeed(payload)),
        () => dispatch(errorSearchingFeed())
    )

    const onRefresh = React.useCallback(() => {
        dispatch(reset())
        setRefreshing(true);
        wait(100).then(() => setRefreshing(false));
    }, []);

    const {navigate} = props.navigation;

    useEffect(() => {
        AsyncStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            .then(username => {
                if (username !== null) {
                    setLoggedUsername(username)
                    getFeed()
                } else {
                    console.log("ERROR: No username from AsyncStorage")
                }
            })
    }, []);

    /*const commentPost = (pictureID, comment) =>
        post('/comment/' + pictureID, comment, 'text/plain')
            .catch(error => alert(error))*/

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 1;

        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const toggleReaction = (postId: string, toDelete: boolean) => togglePostReaction(
        postId,
        toDelete,
        () => dispatch(unReactingToPost()),
        (postId) => dispatch(successUnReactingPost(postId)),
        () => dispatch(errorUnReactingPost()),
        () => dispatch(likingPost()),
        (postId) => dispatch(successLikingPost(postId)),
        () => dispatch(errorLikingPost())
    )

    return (
        <KeyboardAvoidingScrollView
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    getFeed()
                }
            }}
            scrollEventThrottle={10}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
            {
                posts.length === 0 && <WallPost
                    date={getFormattedDate(new Date())}
                    mediaUrl={'https://res.cloudinary.com/siqpik/image/upload/v1670515879/ibscji05tdziedxvfz7p.jpg'}
                    username={'Siqpik'}
                    profilePicUrl={'https://res.cloudinary.com/siqpik/image/upload/v1670515879/ibscji05tdziedxvfz7p.jpg'}
                    likesCount={9999}
                    likePost={() => {
                    }}
                    postKey={':postView'}
                    //commentsCount={999}
                    comments={[]}
                    iReacted={true}
                    loggedUsername={loggedUsername}
                />
            }
            {posts.map((post, index) =>
                <WallPost
                    navigate={navigate}
                    id={post.id}
                    key={index + ':postViewK'}
                    postKey={index + ':postView'}
                    date={getFormattedDate(post.date)}
                    mediaUrl={post.mediaUrl}
                    username={post.userInfo.username}
                    displayName={post.userInfo.displayName}
                    profilePicUrl={post.userInfo.profilePicUrl}
                    likePost={toggleReaction}
                    likesCount={post.likesCount}
                    //commentPost={commentPost}
                    //commentsCount={post.commentsCount}
                    //comments={post.comments}
                    iReacted={post.iReacted}
                    loggedUsername={loggedUsername}
                />
            )}
        </KeyboardAvoidingScrollView>
    );
}