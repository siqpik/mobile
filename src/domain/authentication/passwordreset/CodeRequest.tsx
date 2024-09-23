import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingScrollView} from "react-native-keyboard-avoiding-scroll-view";
import Logo from "../login/Logo";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../style/styles";
import {genericPostWithNoResponse} from "../../service/ApiService";


export default () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [clicked, setClicked] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(true)

    const validateEmail = () => {
        setIsValidEmail(false)
        const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const test = regExp.test(email)
        setIsValidEmail(test)
    }

    const requestCode = () => {
        validateEmail()
        setClicked(true)
    }

    useEffect(() => {
        if (clicked) {
            if (isValidEmail) {
                genericPostWithNoResponse('/user/credentials/request/', {email})
                    .catch(err => console.log(err))
                    .then(_ => {
                        navigation.navigate("ConfirmResetCode", {email})//TODO navigate to new
                    })
            }
        }
    }, [isValidEmail, clicked])

    return (
        <KeyboardAvoidingScrollView containerStyle={styles.container}>
            <Logo/>
            <View style={styles.formContainer}>
                <TextInput style={styles.inputBox}
                           placeholder='Email'
                           placeholderTextColor='#000'
                           onChangeText={email => setEmail(email)}
                           value={email}
                />
                {
                    <TouchableOpacity style={styles.button} onPress={() => requestCode()}>
                        <Text style={styles.buttonText}> Send Code </Text>
                    </TouchableOpacity>
                }
                {!isValidEmail && <Text style={{color: 'red'}}>Email is not correct</Text>}
            </View>
        </KeyboardAvoidingScrollView>
    );
}
