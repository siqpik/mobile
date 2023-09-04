import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {getJson, post} from '../service/ApiService';
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthenticationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ProfileHeader} from "./ProfileHeader";
import {PicsContainer} from "./PicsContainer";

export default props => {

    const [user, setUser] = useState(undefined)
    const [userName, setUserName] = useState(props.route.params ? props.route.params.userName : undefined)
    const [postsPage, setPostsPage] = useState(1)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (undefined === userName) {
            AsyncStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
                .then(loggedUserName => {
                    setUserName(loggedUserName)
                })
        }

        fillProfile()
            .then(_ => getProfilePosts())
    }, [userName])

    const fillProfile = () => getJson('/profile/' + userName)//TODO change to /user/username/profile
        .then(u => {
            setUser(u)
        })
        .catch(error => {
            console.log("Error finding " + userName + " profile: " + error)
        })

    const getProfilePosts = () => getJson(`/post/${userName}/${postsPage}`)
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
            console.log("Error searching posts: " + error)
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
        console.log("Ronn: " + postId)
        //alert(JSON.stringify(posts))
    }

    return (
        user
            ? (
                <FlatList
                    ListHeaderComponent={<ProfileHeader
                        name={user.name}
                        profilePicUrl={user.profilePicUrl}
                        admirersCount={user.admirersCount}
                        admiredCount={user.admiredCount}
                        username={userName}
                        amIAdmirer={user.amIAdmirer}
                        isLoggedUser={user.isLoggedUser}
                        hasPendingRequest={user.hasPendingRequest}
                        sendAdmireRequest={() => sendAdmireRequest(userName)}
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
            : (<Text>Loading...{userName}</Text>)
    )
}
