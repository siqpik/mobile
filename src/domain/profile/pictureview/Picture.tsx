import React from 'react'
import {View} from "react-native"
import {styles} from "./style/styles"
import PagerView from "react-native-pager-view";
import WallPost from "@/src/domain/shared/components/Post";
import {User} from "@/src/domain/profile/model/User";
import {KeyboardAvoidingScrollView} from "react-native-keyboard-avoiding-scroll-view";
import ProfilePost from "@/src/domain/profile/model/ProfilePost";

export default (props: {
    route: { params: { posts: any; user: User; index: any; onDeletePost: any; loggedUsername: string }; };
    navigation: {
        (arg0: string, arg1: { userName?: string | undefined; screenName?: string | undefined; }): void;
        navigate?: any;
    };
}) => {

    const {posts, user, index, onDeletePost, loggedUsername} = props.route.params;

    /*const changeProfilePic = pidId =>
        post('/profile/changeProfilePic/' + pidId)
            .then(resp => {
                if (resp.status === 200) {
                    console.log(resp.status);
                }
            }).catch(error => alert(error));*/

    const getPics = () => posts.map((post: ProfilePost, index: string) =>
        <View style={styles.container} key={index + 'pictureView'}>
            <KeyboardAvoidingScrollView>
                <WallPost
                    postId={post.id}
                    key={index + ':postViewK'}
                    postKey={index + ':postView'}
                    date={post.date}
                    mediaUrl={post.mediaUrl}
                    username={user.userName}
                    displayName={user.displayName}
                    profilePicUrl={user.profilePicUrl}
                    likesCount={post.reactionsCount}
                    iReacted={post.iReacted}
                    loggedUsername={loggedUsername}
                    onDeletePost={onDeletePost}
                />
            </KeyboardAvoidingScrollView>
        </View>
    )

    /*const getComments = (pic) => pic.comments.map((post, index) =>
        <View key={index} style={styles.comments}>
            <Text style={styles.user}>{post.userName}</Text>
            <Text style={styles.comment}>{post.comments}</Text>
        </View
    )*/

    return (
        <PagerView style={{flex: 1}} initialPage={index} showPageIndicator={false}
                   orientation={'vertical'}>
            {getPics()}
        </PagerView>
    )
}
