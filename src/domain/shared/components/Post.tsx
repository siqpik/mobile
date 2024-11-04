import React, {useEffect, useState} from 'react';
import {styles} from "../../home/style/styles";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from "react-native-fast-image";
import {useAppDispatch} from "@/src/config/hooks";
import {togglePostReactionOnFeed} from "@/src/domain/shared/utils/functions";
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
import {fetchFeed} from "@/src/domain/shared/feedService";
import {deleteItem} from "@/src/domain/service/ApiService";
import {useRoute} from "@react-navigation/core";
import {addPostReaction, removeReaction} from "@/src/domain/profile/modules/profileSlice";
import {runOnJS} from "react-native-reanimated";

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

    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [currentScreen, setCurrentScreen] = useState<String>()
    const [iReacted, setIReacted] = useState<boolean>(props.iReacted)
    const [reactionCount, setReactionCount] = useState<number>(props.likesCount);
    const route = useRoute()

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
        if ('Picture' === route.name) {
            if (iReacted){
                setReactionCount(reactionCount - 1)
                dispatch(removeReaction(props.postId))
            } else {
                dispatch(addPostReaction(props.postId))
                setReactionCount(reactionCount + 1)
            }
        }

        togglePostReactionOnFeed(
            props.postId,
            props.iReacted,
            () => dispatch(unReactingToPost()),
            (postId) => dispatch(successUnReactingPost(postId)),
            () => dispatch(errorUnReactingPost()),
            () => dispatch(likingPost()),
            (postId) => dispatch(successLikingPost(postId)),
            () => dispatch(errorLikingPost())
        )

        setIReacted(!iReacted)
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
        .onStart(() => runOnJS(toggleReaction)())

    const getReactionIconName = () => {
        if (route.name === 'Picture'){
            return iReacted ? 'star' : 'staro'
        }

        return props.iReacted ? 'star' : 'staro'
    }

    const getReactionsCount=()=>{
        if (route.name === 'Picture'){
            return reactionCount
        }

        return props.likesCount
    }

    const getReactionsText = ()=>{
        const count = getReactionsCount()
        return `${count} reaction${count === 1 ? '' : 's'}`
    }

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
                    {getReactionsText()}
                </Text>
                {/*<Text style={styles.firstComment}> {props.commentsCount} comments </Text>*/}

                <Icon
                    onPress={() => toggleReaction()}
                    name={getReactionIconName()}
                    size={35}
                    color="black"
                />
            </View>

            <View style={{height: 21}}/>
        </View>
    )
}