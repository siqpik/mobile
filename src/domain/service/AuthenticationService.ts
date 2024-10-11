import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationRequest from './model/AuthenticationRequest';
import {authenticatedRequest, genericPost} from './ApiService';
import notifee from "@notifee/react-native";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'USER_NAME_SESSION_ATTRIBUTE_NAME';
export const TOKEN_SESSION = 'TOKEN_SESSION_ATTRIBUTE_NAME';

export const authenticate = (usernameOrEmail: string, password: string) =>
    genericPost('/login', new AuthenticationRequest(usernameOrEmail, password))
        .then(json => registerSuccessfulLogin(json.jwt, json.username))

export const registerSuccessfulLogin = (token: string, username: string) => {
    AsyncStorage.setItem(TOKEN_SESSION, token)
    AsyncStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
}

export const logout = () => authenticatedRequest('/logout', 'GET')
    .then(response => {
        if (!response.ok) {
            console.log(JSON.stringify(response))
        } else {
            AsyncStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            AsyncStorage.removeItem(TOKEN_SESSION)

            notifee.cancelNotification('open-app-reminder').then()
        }
    })