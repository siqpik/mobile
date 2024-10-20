import React, {useEffect, useState} from 'react';
import {styles} from "../../home/style/styles";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from "react-native-fast-image";
import {useAppDispatch} from "@/src/config/hooks";
import {togglePostReaction} from "@/src/domain/shared/utils/functions";
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
} from "@/src/domain/home/modules/feedSlice"
import {useNavigation} from "@react-navigation/native"
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import PostMenu from "@/src/domain/shared/components/PostMenu";
import {fetchFeed} from "@/src/domain/home/modules/feedService";
import {deleteItem} from "@/src/domain/service/ApiService";

export default (props: {
    iReacted: boolean;
    loggedUsername: string;
    username: string;
    postKey: React.Key | null | undefined;
    profilePicUrl: string;
    displayName: string
    date: Date
    mediaUrl: string;
    likesCount: number
    postId: string;
    onDeletePost: any
}) => {

    const [picLiked = props.iReacted, setPicLiked] = useState<boolean>();
    const [reactionCount, setReactionCount] = useState<number>(props.likesCount);
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [currentScreen, setCurrentScreen] = useState<String>()

    //const [comment, setComment] = useState();

    useEffect(() => {
        //alert(JSON.stringify(props.username))
    }, []);

    const goToProfile = () => {
        if (props.loggedUsername !== props.username) {
            if (props.username !== 'Siqpik') {
                navigation.navigate('ProfileOther', {
                    userName: props.username
                })
            }
        } else {
            navigation.navigate('ProfileScreen', {
                screenName: 'ProfileScreen',
            })
        }
    }

    const getFormattedDate = (date: Date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        const d = new Date(date)
        const postYear = d.getUTCFullYear()

        return monthNames[d.getMonth()] + ' ' + d.getDate() + ' ' + (postYear === new Date().getUTCFullYear() ? '' : postYear)
    }

    const getFeed = () => {
        dispatch(reset())
        fetchFeed(
            1,
            () => dispatch(searchingFeed()),
            (payload) => dispatch(successSearchingFeed(payload)),
            () => dispatch(errorSearchingFeed())
        )
    }

    const toggleReaction = () => {
        setReactionCount(picLiked ? reactionCount - 1 : reactionCount + 1)
        togglePostReaction(
            props.postId,
            picLiked,
            () => dispatch(unReactingToPost()),
            (postId) => dispatch(successUnReactingPost(postId)),
            () => dispatch(errorUnReactingPost()),
            () => dispatch(likingPost()),
            (postId) => dispatch(successLikingPost(postId)),
            () => dispatch(errorLikingPost())
        )

        setPicLiked(!picLiked);
    }

    const deletePost = () => {
        if (props.onDeletePost) {
            props.onDeletePost()(props.postId)
        }
        deleteItem('/post/' + props.postId)
            .then(resp => {
                if (resp.status === 202) {
                    getFeed()
                }
            })
    }

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            console.log("Reacting soon...")
        });

    return (
        <View key={props.postKey}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start' // if you want to fill rows left to right
                }}
            >
                <TouchableOpacity onPress={() => goToProfile()} style={styles.userTitle}>

                    <FastImage source={{uri: props.profilePicUrl}} style={styles.profilePic}/>
                    <View style={styles.titleName}>
                        <Text style={styles.name}>{props.displayName}</Text>
                        <Text style={styles.smallerName}>{getFormattedDate(props.date)}</Text>
                    </View>
                </TouchableOpacity>

                {(props.loggedUsername === props.username && props.onDeletePost) &&
                    <PostMenu
                        deletePost={() => deletePost()}
                    />
                }
            </View>

            <GestureDetector gesture={doubleTap}>
                <FastImage
                    source={{uri: props.mediaUrl}} style={styles.wallPic}
                    //onError={(error) => console.log('There was an error: ' + error.nativeEvent.error)}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </GestureDetector>


            <View style={styles.comments}>
                <Text style={styles.firstComment}>
                    {reactionCount} reaction{reactionCount === 1 ? '' : 's'}
                </Text>
                {/*<Text style={styles.firstComment}> {props.commentsCount} comments </Text>*/}

                <Icon
                    onPress={() => toggleReaction()}
                    name={picLiked ? "star" : "staro"}
                    size={35}
                    color="black"
                />
            </View>

            <View style={{height: 21}}/>
        </View>
    )
}