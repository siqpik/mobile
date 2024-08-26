import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_SESSION} from "../shared/Consts";
import {logout} from './AuthenticationService'

//const API_URL = 'http://localhost:8080';
const API_URL = 'https://siqpik.up.railway.app';

export const post = (url, body, contentType) => {
    return authenticatedRequest(url,
        'POST', body, contentType);
}

export const patch = (url, body, contentType) => {
    return authenticatedRequest(url,
        'PATCH', body, contentType);
}

export const uploadMedia = media =>
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

export const deleteItem = (url, body, contentType) => authenticatedRequest(url,
    'DELETE', body, contentType);

export const getJson = url => authenticatedRequest(url, 'GET')
    .then(response => response.json());

export const authenticatedRequest = (url, method, body?,
                                     contentType?) => AsyncStorage.getItem(TOKEN_SESSION)
    .then(token => {
        return genericFetch(url, method,
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': contentType || 'application/json'
            },
            body
        )
    })

export const genericPost = (url, body) =>
    genericPostWithNoResponse(url, body)
        .then(response => response.json())

export const genericPatch = (url, body) =>
    genericFetch(url, 'PATCH', {'Content-Type': 'application/json'},
        JSON.stringify(body))

export const genericPostWithNoResponse = (url, body) =>
    genericFetch(url, 'POST', {'Content-Type': 'application/json'},
        JSON.stringify(body))

const genericFetch = (url, method, headers, body) => {

    const fullUrl = API_URL + url

    return fetch(fullUrl, {
        method: method,
        headers: headers,
        body: body
    }).then(response => {
        return handleErrors(response)
    })
}

function handleErrors(response) {
    if (!response.ok) {
        console.log("Something went wrong fetching: " + JSON.stringify(response))
        if(403 === response.status){
            console.log("Unauthorised: Logging out...")
            logout()
            return;
        }

        throw Error(response.status);
    }
    return response;
}
