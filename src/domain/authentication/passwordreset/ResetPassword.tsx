import React, {useState} from 'react';
import {KeyboardAvoidingScrollView} from "react-native-keyboard-avoiding-scroll-view";
import Logo from "../login/Logo";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../style/styles";
import {genericPatch, genericPostWithNoResponse} from "../../service/ApiService";


export default props => {

    const navigation = useNavigation()
    const [pass, setPass] = useState("")
    const [confirmedPass, setConfirmedPass] = useState("")
    const [validPass, setValidPass] = useState(true)

    const validatePasswords = () => {
        if (pass === confirmedPass) {
            setValidPass(true)

            genericPatch(`/user/${props.route.params.userId}/password`, {newPassword: pass})
                .catch(_ => {
                    alert("Could not change password. Please try again")
                })
            navigation.navigate("Login", {passResetMessage: "Password successfully changed!"})
        } else {
            setValidPass(false)
        }
    }

    return (
        <KeyboardAvoidingScrollView containerStyle={styles.container}>
            <Logo/>
            <View style={styles.formContainer}>
                <Text style={styles.signupText}> Enter your new Password: {pass } {confirmedPass}</Text>

                <TextInput style={styles.inputBox}
                           placeholder='New password'
                           placeholderTextColor='#000'
                           secureTextEntry={true}
                           onChangeText={pass => setPass(pass)}
                           value={pass}
                />

                <TextInput style={styles.inputBox}
                           placeholder='Confirm new Password'
                           placeholderTextColor='#000'
                           secureTextEntry={true}
                           onChangeText={confirmedPass => setConfirmedPass(confirmedPass)}
                           value={confirmedPass}
                />

                {<TouchableOpacity style={styles.button} onPress={() => validatePasswords()}>
                    <Text style={styles.buttonText}> Change password </Text>
                </TouchableOpacity>}

                {!validPass && <Text style={{color: 'red'}}>Passwords are different</Text>}
            </View>
        </KeyboardAvoidingScrollView>
    );
}
