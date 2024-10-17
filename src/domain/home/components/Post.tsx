import React, {useState} from 'react';
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
} from "@/src/domain/home/modules/feedSlice";

export default (props: {
    iReacted: boolean;
    loggedUsername: string;
    username: string;
    navigate: (arg0: string, arg1: { userName?: string; screenName?: string; }) => void;
    postKey: React.Key | null | undefined;
    profilePicUrl: string;
    displayName: string
    date: Date
    mediaUrl: string;
    likesCount: number
    postId: string;
}) => {

    const [picLiked = props.iReacted, setPicLiked] = useState<boolean>();
    const dispatch = useAppDispatch()

    //const [comment, setComment] = useState();

    const goToProfile = () => {
        if (props.loggedUsername !== props.username) {
            if (props.username !== 'Siqpik') {
                props.navigate('ProfileOther', {
                    userName: props.username
                })
            }
        } else {
            props.navigate('ProfileScreen', {
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
        <View key={props.postKey}>

            <TouchableOpacity onPress={() => goToProfile()}>
                <View style={styles.userTitle}>

                    <FastImage source={{uri: props.profilePicUrl}} style={styles.profilePic}/>
                    <View style={styles.titleName}>
                        <Text style={styles.name}>{props.displayName}</Text>
                        <Text style={styles.smallerName}>{getFormattedDate(props.date)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <FastImage
                source={{uri: props.mediaUrl}} style={styles.wallPic}
                //onError={(error) => console.log('There was an error: ' + error.nativeEvent.error)}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={styles.comments}>
                <Text style={styles.firstComment}>
                    {props.likesCount} reaction{props.likesCount > 1 ? 's' : ''}
                </Text>
                {/*<Text style={styles.firstComment}> {props.commentsCount} comments </Text>*/}

                <Icon
                    onPress={() => {
                        toggleReaction(props.postId, picLiked);
                        setPicLiked(!picLiked);
                    }}
                    name={picLiked ? "star" : "staro"}
                    size={35}
                    color="black"
                />
            </View>

            <View style={{height: 21}}/>
        </View>
    )
}