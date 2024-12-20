import React, {useState} from 'react';
import {FlatList, Text} from 'react-native';
import {getJson, post} from '../service/ApiService';
import {ProfileHeader} from "./ProfileHeader";
import {PicsContainer} from "./PicsContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthenticationService";
import {User} from "@/src/domain/profile/model/User";
import ProfilePost from "@/src/domain/profile/model/ProfilePost";
import {useAppDispatch, useAppSelector} from "@/src/config/hooks";
import {reset, successSearchingPosts} from "@/src/domain/profile/modules/profileSlice";
import {useFocusEffect} from "@react-navigation/core";

export default props => {

    const [user, setUser] = useState<User>()
    const [postsPage, setPostsPage] = useState<number>(1)
    //const [posts, setPosts] = useState<ProfilePost[]>([])
    const [loggedUsername, setLoggedUsername] = useState<String>()

    const {posts} = useAppSelector(store => store.profile)
    const dispatch = useAppDispatch()

    useFocusEffect(
        React.useCallback(() => {
            const navigationUserName = props.route.params ? props.route.params.userName : undefined;

            if (undefined === navigationUserName) {
                AsyncStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
                    .then(loggedUserName => {
                        if (loggedUserName) {
                            getProfilePosts(loggedUserName)
                            fillProfile(loggedUserName)
                            setLoggedUsername(loggedUserName)
                        }
                    })
            } else {
                getProfilePosts(navigationUserName)
                fillProfile(navigationUserName)
            }
        }, [])
    )

    const fillProfile = (userName: string) => getJson('/profile/' + userName)//TODO change to /user/username/profile
        .then(u => {
            setUser(new User(u))
        })
        .catch(error => {
            alert("Error finding " + userName + " profile: " + error)
        })

    const getProfilePosts = (userName: string) => {
        dispatch(reset())
        getJson(`/post/${userName}/${postsPage}`)
            .then(json => json.postUrls.map((post: any) => new ProfilePost(post)))
            .then(postUrls => {
                dispatch(successSearchingPosts(postUrls, postsPage))
            })
            .then(_ => setPostsPage(postsPage + 1))
            .catch(error => {
                console.log("Error searching posts: " + error) //TODO if 403 should logout :)
                console.log(typeof error)
            })
    }

    const sendAdmireRequest = (userName: string) => post('/admire-request/' + userName)
        .then(resp => {
            if (resp.status === 201) {
                setUser({
                    ...user,
                    hasPendingRequest: true
                })
            }
        }).catch(error => alert("Admire request cannot be sent now. Please try again later: " + error))

    const deletePost = (postId: string) => {
        props.navigation.navigate("Profile")
        const newPosts = posts.filter(post => post.id !== postId)
        dispatch(successSearchingPosts(newPosts, 1))
    }

    return (
        user
            ? (
                <FlatList
                    ListHeaderComponent={<ProfileHeader
                        displayName={user.displayName}
                        profilePicUrl={user.profilePicUrl}
                        admirersCount={user.admirersCount}
                        admiredCount={user.admiredCount}
                        username={user.userName}
                        amIAdmirer={user.amIAdmirer}
                        isLoggedUser={user.isLoggedUser}
                        hasPendingRequest={user.hasPendingRequest}
                        sendAdmireRequest={() => sendAdmireRequest(user.userName)}
                        navigation={props.navigation}
                    />}
                    ListFooterComponent={
                        (user.amIAdmirer || user.isLoggedUser) &&
                        <PicsContainer
                            posts={posts}
                            navigate={props.navigation.navigate}
                            user={user}
                            onDeletePost={() => deletePost.bind(this)}
                            loggedUsername={loggedUsername}
                        />
                    }
                />
            )
            : (<Text>Loading...</Text>)
    )
}