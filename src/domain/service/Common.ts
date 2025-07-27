import {authenticatedRequest} from "@/src/domain/service/ApiService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import notifee from "@notifee/react-native"
import {TOKEN_SESSION, USER_NAME_SESSION_ATTRIBUTE_NAME} from "@/src/domain/service/AuthenticationService"

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