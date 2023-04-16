import {styles} from "../style/styles";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export const ForgotPasswordButton = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.signupTextCont}>
        <Text>Forgot your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("PasswordResetCodeRequest")}>
            <Text style={styles.signupText}> Reset it!</Text>
        </TouchableOpacity>
    </View>);
}
