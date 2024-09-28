import {styles} from "../style/styles";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default () => {

    const navigation = useNavigation();

    return (
        <View style={styles.signupTextCont}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}> Login</Text>
            </TouchableOpacity>
        </View>
    )
}