import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style/styles";
import {shortenName} from '../../shared/utils/functions';
import {AdmireRequestStatus} from "./model/Notification";
import FastImage from "@d11/react-native-fast-image";;


export const AdmireRequestNotification = props =>
    <View style={styles.generalLayout}>
        <TouchableOpacity onPress={props.goToProfile}>
            <FastImage
                key={props.id}
                style={styles.img}
                source={{uri: props.image}}
            />
            <Text style={styles.userName}>{shortenName(props.username)}</Text>
        </TouchableOpacity>

        {props.status === AdmireRequestStatus.PENDING
            ? (
                <View style={styles.statusContainer}>
                    <View style={styles.userContainer}>
                        <Text> Wants to admire you!</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={props.accept}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={props.dismiss}
                        >
                            <Text style={styles.buttonText}>Dismiss</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            : <View style={styles.statusContainer}>
                <Text style={styles.userName}> Is now your admirer</Text>
            </View>
        }
    </View>
