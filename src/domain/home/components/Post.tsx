import React, {useEffect, useState} from 'react';
import {styles} from "../style/styles";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from "react-native-fast-image";
import {useAppDispatch} from "@/src/config/hooks";
import {togglePostReaction} from "@/src/domain/shared/utils/functions";
import {
    errorLikingPost,
    errorUnReactingPost,
    likingPost,
    successLikingPost,
    successUnReactingPost,
    unReactingToPost
} from "@/src/domain/home/modules/feedSlice"
import {useNavigation} from "@react-navigation/native"
import {PopMenu, PopMenuItem, PopMenuProvider} from "react-native-simple-pop-menu";
import Button = Icon.Button;

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
}) => {

    const [picLiked = props.iReacted, setPicLiked] = useState<boolean>();
    const [reactionCount, setReactionCount] = useState<number>(props.likesCount);
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

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

    const toggleReaction = (postId: string) => {
        setReactionCount(picLiked ? reactionCount - 1 : reactionCount + 1)
        togglePostReaction(
            postId,
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

    return (
        <View key={props.postKey} style={{flex: 1}}>
            <TouchableOpacity onPress={() => goToProfile()} style={styles.userTitle}>
                <FastImage source={{uri: props.profilePicUrl}} style={styles.profilePic}/>

                <View style={styles.titleName}>
                    <Text style={styles.name}>{props.displayName}</Text>
                    <Text style={styles.smallerName}>{getFormattedDate(props.date)}</Text>
                </View>
            </TouchableOpacity>

            {props.loggedUsername === props.username &&
                <TouchableOpacity onPress={() => console.log(props.loggedUsername)}
                                  style={{position: "absolute", top: 20, right: 0}}>
                    <Text>{'Remove'}</Text>
                </TouchableOpacity>
            }

            <FastImage
                source={{uri: props.mediaUrl}} style={styles.wallPic}
                //onError={(error) => console.log('There was an error: ' + error.nativeEvent.error)}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={styles.comments}>
                <Text style={styles.firstComment}>
                    {reactionCount} reaction{reactionCount === 1 ? '' : 's'}
                </Text>
                {/*<Text style={styles.firstComment}> {props.commentsCount} comments </Text>*/}

                <Icon
                    onPress={() => toggleReaction(props.postId)}
                    name={picLiked ? "star" : "staro"}
                    size={35}
                    color="black"
                />
            </View>

            <View style={{height: 21}}/>
        </View>
    )
}