import React, {useEffect} from 'react';
import {Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN_SESSION} from "../service/AuthenticationService";
import {useNavigation} from "@react-navigation/native";
import {useFocusEffect} from "@react-navigation/core";

export default () => {

    const navigation = useNavigation()

    useFocusEffect(() => {
        AsyncStorage.getItem(TOKEN_SESSION)
            .then(token => navigation.navigate(token ? 'RootNavigation' : 'Login'))
    })

    return <Text>Loading...</Text>;
}