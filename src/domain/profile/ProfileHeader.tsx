import React from 'react'
import {GestureResponderEvent, Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./style/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from "@d11/react-native-fast-image";;

export const ProfileHeader = (props: { isLoggedUser: boolean; navigation: { openDrawer: () => void; }; displayName: string; username: string; profilePicUrl: string; admirersCount: number; amIAdmirer: boolean; hasPendingRequest: boolean; sendAdmireRequest: { (event: GestureResponderEvent): void; (event: GestureResponderEvent): void; }; admiredCount: number; }) =>
    <View>
        {props.isLoggedUser &&
            <TouchableOpacity style={styles.rightAlign} onPress={() => props.navigation.openDrawer()}>
                <Icon
                    name="bars"
                    size={25}
                />
            </TouchableOpacity>}
        <View style={styles.header}>
            <View>
                <Text style={styles.name}>{props.displayName}</Text>
            </View>
            <FastImage
                key={props.username}
                style={styles.profilePic}
                source={{uri: props.profilePicUrl}}
            />
            <View style={styles.admireContainer}>
                <View style={styles.centerHorizontal}>
                    <Text>Admirers</Text>
                    <Text style={{fontWeight: 'bold'}}>{props.admirersCount}</Text>
                </View>
                <View>
                    {props.isLoggedUser
                        ? null
                        : props.amIAdmirer
                            ? <Icon
                                name='hand-grab-o'
                                type='font-awesome'
                                color='black'
                                size={35}
                            />
                            : props.hasPendingRequest
                                ? <Icon
                                    name='hourglass-half'
                                    type='font-awesome'
                                    color='#293329'
                                    size={35}
                                    onPress={props.sendAdmireRequest}
                                />
                                : <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#293329'
                                    size={35}
                                    onPress={props.sendAdmireRequest}
                                />
                    }
                </View>
                <View style={styles.centerHorizontal}>
                    <Text>Admired</Text>
                    <Text style={{fontWeight: 'bold'}}>{props.admiredCount}</Text>
                </View>
            </View>
        </View>
    </View>