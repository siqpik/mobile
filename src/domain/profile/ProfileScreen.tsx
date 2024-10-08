import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {deleteItem, getJson, post} from '../service/ApiService';
import {ProfileHeader} from "./ProfileHeader";
import {PicsContainer} from "./PicsContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthenticationService";

export default props => {

    const [user, setUser] = useState(undefined)
    const [postsPage, setPostsPage] = useState(1)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const navigationUserName = props.route.params ? props.route.params.userName : undefined;

        if (undefined === navigationUserName) {
            AsyncStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
                .then(loggedUserName => {
                    fillProfile(loggedUserName)
                        .then(() => getProfilePosts(loggedUserName))
                })
        } else {
            fillProfile(navigationUserName)
                .then(() => getProfilePosts(navigationUserName))
        }
    }, [])

    const fillProfile = userName => getJson('/profile/' + userName)//TODO change to /user/username/profile
        .then(u => {
            setUser(u)
        })
        .catch(error => {
            alert("Error finding " + userName + " profile: " + error)
        })

    const getProfilePosts = userName => getJson(`/post/${userName}/${postsPage}`)
        .then(json => json.postUrls)
        .then(postUrls => {
            setPosts(
                postsPage === 1 ? postUrls : [...posts, ...postUrls]
            )
        })
        .then(_ => {
            setPostsPage(postsPage + 1)
        })
        .catch(error => {
            console.log("Error searching posts: " + error) //TODO if 403 should logout :)
            console.log(typeof error)
        })

    const sendAdmireRequest = userName => post('/admire-request/' + userName)
        .then(resp => {
            if (resp.status === 201) {
                setUser({
                    ...user,
                    hasPendingRequest: true
                })
            }
        }).catch(error => alert("Admire request cannot be sent now. Please try again later: " + error))

    const deletePost = postId => {
        deleteItem('/post/' + postId)
            .then(resp => {
                if (resp.status === 202) {
                    const newPosts = posts.filter(post => post.id !== postId)
                    setPosts(newPosts)
                }
            })
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
                            isActualUser={user.isLoggedUser}
                            posts={posts}
                            navigate={props.navigation.navigate}
                            username={user.name}
                            deletePost={() => deletePost}
                        />

                    }
                />
            )
            : (<Text>Loading...</Text>)
    )
}
