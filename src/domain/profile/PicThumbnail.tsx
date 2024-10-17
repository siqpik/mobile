import React from 'react';
import {TouchableOpacity} from "react-native";
import {styles} from "./style/styles";
import FastImage from "react-native-fast-image";
import {User} from "@/src/domain/profile/model/User";

export default (props: {
    navigate: (arg0: string, arg1: { index: any; posts: any; user: User; deletePost: any; }) => void;
    index: React.Key | null | undefined;
    posts: any;
    user: User;
    deletePost: any;
    url: any;
}) =>
    <TouchableOpacity
        onPress={() => props.navigate('Picture', {
            index: props.index,
            posts: props.posts,
            user: props.user,
            deletePost: props.deletePost
        })}

        key={props.index + 'thumbnail'}
    >
        <FastImage
            key={props.index}
            style={styles.picStyle}
            source={{uri: props.url}}
        />
    </TouchableOpacity>
