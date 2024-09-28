import {Avatar, ListItem} from "react-native-elements";
import React from "react";

export default props =>
    <ListItem key={props.index}
              bottomDivider
              onPress={() => props.navigation.navigate('ProfileOther', {userName: props.userName})}
    >
        <Avatar source={{uri: props.avatarUrl}}/>
        <ListItem.Content>
            <ListItem.Title>{props.userName}</ListItem.Title>
            <ListItem.Subtitle>{props.name}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>