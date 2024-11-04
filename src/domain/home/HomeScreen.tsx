import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import WallPost from '../shared/components/Post';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthenticationService";
import {errorSearchingFeed, reset, searchingFeed, successSearchingFeed} from "./modules/feedSlice";
import {useAppDispatch, useAppSelector} from "../../config/hooks";
import {fetchFeed} from "@/src/domain/shared/feedService";

export default props => {

    const {posts, page} = useAppSelector(store => store.feed)
    const dispatch = useAppDispatch()

    const [loggedUsername, setLoggedUsername] = useState<string>("");
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout: number) => {
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
                    date={new Date()}
                    mediaUrl={'https://res.cloudinary.com/siqpik/image/upload/v1670515879/ibscji05tdziedxvfz7p.jpg'}
                    username={'Siqpik'}
                    profilePicUrl={'https://res.cloudinary.com/siqpik/image/upload/v1670515879/ibscji05tdziedxvfz7p.jpg'}
                    likesCount={9999}
                    postKey={':postView'}
                    iReacted={true}
                    loggedUsername={loggedUsername}
                />
            }
            {posts.map((post, index) =>
                <WallPost
                    postId={post.id}
                    key={index + ':postViewK'}
                    postKey={index + ':postView'}
                    date={post.date}
                    mediaUrl={post.mediaUrl}
                    username={post.userInfo.username}
                    displayName={post.userInfo.displayName}
                    profilePicUrl={post.userInfo.profilePicUrl}
                    likesCount={post.likesCount}
                    iReacted={post.iReacted}
                    loggedUsername={loggedUsername}
                />
            )}
        </KeyboardAvoidingScrollView>
    );
}