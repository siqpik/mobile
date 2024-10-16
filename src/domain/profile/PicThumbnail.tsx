import React from 'react';
import {TouchableOpacity} from "react-native";
import {styles} from "./style/styles";
import FastImage from "react-native-fast-image";

export default props =>
    <TouchableOpacity
        onPress={() => props.navigate('Picture', {
            index: props.index,
            posts: props.posts,
            username: props.username,
            actualUser: props.actualUser,
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
