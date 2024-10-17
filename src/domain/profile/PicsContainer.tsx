import React from 'react';
import {FlatGrid} from "react-native-super-grid";
import PicThumbnail from "./PicThumbnail";
import {User} from './model/User';
import ProfilePost from "@/src/domain/profile/model/ProfilePost";

export const PicsContainer = (props: {
    posts: ProfilePost[]
    user: User;
    navigate: (arg0: string, arg1: { index: any; posts: ProfilePost[]; user: User; deletePost: any; }) => void;
    deletePost: any;
}) =>
    <FlatGrid
        contentContainerStyle={{alignItems: 'center'}}
        data={props.posts}
        itemDimension={170}
        fixed={true}
        renderItem={({item, index}) => (
            <PicThumbnail
                index={index}
                url={item.mediaUrl}
                posts={props.posts}
                user={props.user}
                navigate={props.navigate}
                deletePost={props.deletePost}
            />
        )}
    />