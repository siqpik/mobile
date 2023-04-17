import React, {useState} from 'react';
import {KeyboardAvoidingScrollView} from "react-native-keyboard-avoiding-scroll-view";
import {Logo} from "../login/Logo";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../style/styles";
import {genericPostWithNoResponse} from "../../service/ApiService";


export default props => {

    const navigation = useNavigation()
    const [code, setCode] = useState("")

    const validateResetCode = () => {
        genericPostWithNoResponse(`/user/credentials/request/${code}`, {email: props.route.params.email})
            .catch(err => {
                alert("Code is not correct")
            })
            .then(res => res.json())
            .then(res => {
                console.log("Ronn: " + JSON.stringify(res))
                navigation.navigate("ResetPassword", {userId: res.userId})//TODO navigate to new
            })
    }

    return (
        <KeyboardAvoidingScrollView containerStyle={styles.container}>
            <Logo/>
            <View style={styles.formContainer}>
                <Text style={styles.signupText}> Enter the code we just sent to your email
                    {"\n"}This is only valid for 10 minutes</Text>

                <TextInput style={styles.inputBox}
                           placeholder='Code'
                           placeholderTextColor='#000'
                           keyboardType='numeric'
                           onChangeText={code => setCode(code)}
                           value={code}
                />

                {<TouchableOpacity style={styles.button} onPress={() => validateResetCode()}>
                    <Text style={styles.buttonText}> Confirm </Text>
                </TouchableOpacity>}
            </View>
        </KeyboardAvoidingScrollView>
    );
}
