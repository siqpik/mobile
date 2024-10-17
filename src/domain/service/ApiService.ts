import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_SESSION} from "../shared/Consts";
import {logout} from './AuthenticationService'

//const API_URL = 'http://localhost:8080';
const API_URL = 'https://siqpik.up.railway.app';

export const post = (url: string, body?: any, contentType?: any) => {
    return authenticatedRequest(url,
        'POST', body, contentType);
}

export const patch = (url: string, body: any, contentType: any) => {
    return authenticatedRequest(url,
        'PATCH', body, contentType);
}

export const uploadMedia = (media: any) =>
    AsyncStorage.getItem(TOKEN_SESSION)
        .then(jwt => fetch(API_URL + '/post/', {
                method: 'POST',
                body: media,
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'multipart/form-data'
                }
            })
        ).then(response => {
        return handleErrors(response)
    })

export const deleteItem = (url: string, body?: undefined, contentType?: undefined) => authenticatedRequest(url,
    'DELETE', body, contentType);

export const getJson = (url: string) => authenticatedRequest(url, 'GET')
    .then(response => response.json());

export const authenticatedRequest = (url: string, method: string, body?: any,
                                     contentType?: string) => AsyncStorage.getItem(TOKEN_SESSION)
    .then(token => {
        return genericFetch(url, method,
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': contentType || 'application/json'
            },
            body
        )
    })

export const genericPost = (url: string, body: any) =>
    genericPostWithNoResponse(url, body)
        .then(response => response.json())

export const genericPatch = (url: string, body: any) =>
    genericFetch(url, 'PATCH', {'Content-Type': 'application/json'},
        JSON.stringify(body))

export const genericPostWithNoResponse = (url: string, body: any) =>
    genericFetch(url, 'POST', {'Content-Type': 'application/json'},
        JSON.stringify(body))

const genericFetch = async (url: string, method: string, headers: any, body: any) => {
    const fullUrl = API_URL + url

    const response = await fetch(fullUrl, {
        method: method,
        headers: headers,
        body: body
    });
    return handleErrors(response);
}

function handleErrors(response: any) {
    if (!response.ok) {
        console.log("Something went wrong fetching: " + JSON.stringify(response))
        if (403 === response.status) {
            console.log("Unauthorised: Logging out...")
            logout()
            return;
        }

        throw Error(response.status);
    }
    return response;
}
