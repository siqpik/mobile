import React, {useState} from 'react';
import {styles} from "../style/styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

export default (props: { iReacted: boolean; loggedUsername: any; username: string; navigate: (arg0: string, arg1: { userName?: any; screenName?: string; }) => void; postKey: React.Key | null | undefined; profilePicUrl: any; displayName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; mediaUrl: any; likesCount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; likePost: (arg0: any, arg1: boolean) => void; id: any; }) => {

    const [picLiked = props.iReacted, setPicLiked]: [boolean, (value: boolean) => void] = useState();

    //const [comment, setComment] = useState();

    const goToProfile = () => {
        if (props.loggedUsername !== props.username) {
            if (props.username !== 'Siqpik'){
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

    return (
        <View key={props.postKey}>

            <TouchableOpacity onPress={() => goToProfile()}>
                <View style={styles.userTitle}>

                    <Image source={{uri: props.profilePicUrl}} style={styles.profilePic}/>
                    <View style={styles.titleName}>
                        <Text style={styles.name}>{props.displayName}</Text>
                        <Text style={styles.smallerName}>{props.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Image
                source={{uri: props.mediaUrl}} style={styles.wallPic}
                onError={(error) => console.log('There was an error: ' + error.nativeEvent.error)}
                resizeMethod={'resize'}
            />

            <View style={styles.comments}>
                <Text style={styles.firstComment}>
                    {props.likesCount} like{props.likesCount > 1 ? 's' : ''}
                </Text>
                {/*<Text style={styles.firstComment}> {props.commentsCount} comments </Text>*/}
                {picLiked ?
                    <Icon
                        onPress={() => {
                            props.likePost(props.id, true);
                            setPicLiked(false);
                        }}
                        name="star"
                        size={35}
                        color="black"
                    />
                    :
                    <Icon
                        onPress={() => {
                            props.likePost(props.id, false);
                            setPicLiked(true);
                        }}
                        name="staro"
                        size={35}
                        color="black"
                    />
                }
            </View>
        </View>
    )
}