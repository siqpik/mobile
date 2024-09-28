import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style/styles';
import {getJson, post} from '../service/ApiService';
import {useNavigation} from "@react-navigation/native";

export default () => {

    const [attempts, setAttempts] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        updateAttempts()
    }, [])

    const updateAttempts = () => {
        getJson('/attempt')
            .then(json => {
                setAttempts(json.attempts);
            })
            .catch(error => alert('An error has occurred getting attempts: ' + error))
    }
    const addAttempt = () => {
        post('/attempt', null, 'application/json')
            .then(() => {
                updateAttempts()
                navigation.navigate('CameraView')
            })
            .catch(error => alert('An error has occurred adding an attempt: ' + error))
    }

    const LIMIT_OF_ATTEMPTS = 3;
    return (
        attempts >= 0 && attempts < LIMIT_OF_ATTEMPTS
            ? (
                <View style={styles.alertContainer}>
                    <View style={styles.alertText}>
                        <Text style={styles.title}>
                            HOW SIQPIK WORKS:
                        </Text>
                        <View style={styles.rules}>
                            <View>
                                <Text style={styles.rulesText}>You cannot upload pictures from your camera roll. All the
                                    pictures and videos (Future) will have to come in the moment you take them.</Text>
                            </View>
                            <View>
                                <Text style={styles.rulesText}>Once you take a picture a timer will start and you must
                                    post within that time or risk losing the photo.</Text>
                            </View>
                            <View>
                                <Text style={styles.rulesText}>You have a maximum of three photos per day. You have
                                    used {attempts} of 3 attempts </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.alertButtons}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Siqpik')}>
                            <Text style={styles.buttonText}> Cancel </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => addAttempt()}>
                            <Text style={styles.buttonText}> Accept </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            : attempts >= LIMIT_OF_ATTEMPTS
                ? (
                    <View style={styles.alertContainer}>
                        <View>
                            <Text style={styles.rulesText}>
                                Not More Attempts For Today!
                            </Text>
                            <Text style={styles.rulesText}>
                                Try Again Tomorrow
                            </Text>

                        </View>
                        <View>
                            <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('Siqpik')}>
                                <Text style={styles.buttonText}> Back To Home Page </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                : <View style={styles.alertContainer}>
                    <View>
                        <Text style={styles.rulesText}>
                            Something went wrong, try again later
                        </Text>
                    </View>
                </View>
    )
}