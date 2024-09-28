import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SignupForm} from './SignupForm';
import LoginButton from "./LoginButton";
import {genericPost} from "../../service/ApiService";
import {authenticate} from "../../service/AuthenticationService";
import Logo from "../login/Logo";
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export default () => {

    const navigation = useNavigation() as StackNavigationProp<any>;

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [formUnFilled, setFormUnFilled] = useState(false)
    const [correctEmail, setCorrectEmail] = useState(true)
    const [signUpButtonEnabled, setSignUpButtonEnabled] = useState(true)

    const readEmail = (email: React.SetStateAction<string>) => setEmail(email);
    const readUserName = (username: React.SetStateAction<string>) => setUsername(username);
    const readDisplayName = (displayName: React.SetStateAction<string>) => setDisplayName(displayName);
    const readPass = (pass: React.SetStateAction<string>) => setPass(pass)

    const isValidEmail = () => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const correctEmail = reg.test(email)
        setCorrectEmail(correctEmail)

        return correctEmail
    }

    const signInClicked = async () => {
        setSignUpButtonEnabled(false)
        if (!isValidEmail()) {
            setSignUpButtonEnabled(true)
            return
        }

        if (!(email && username && pass)) {
            setFormUnFilled(true)
            setSignUpButtonEnabled(true)

            return
        }

        signup()
            .then(() => authenticate(username, pass)
                .then(() => navigation.navigate('RootNavigation'))
                .catch(error => {
                    setSignUpButtonEnabled(true)
                    alert("Error at login: " + error.message)
                })
            )
    };

    const signup = () => genericPost('/user', {
        email: email,
        userName: username,
        password: pass,
        displayName: displayName
    })
        .catch(error => {
            setSignUpButtonEnabled(true)

            if (error.message === '409') {
                alert("username or email already exist")
                navigation.popToTop();
                navigation.navigate('Signup')

                throw Error(error);
            }
        })

    return (
        <KeyboardAvoidingScrollView containerStyle={styles.container}>
            <Logo/>
            <SignupForm
                type="Signup"
                navigation={navigation}
                signInClicked={signInClicked.bind(this)}
                username={username}
                displayName={displayName}
                pass={pass}
                readEmail={readEmail.bind(this)}
                readUserName={readUserName.bind(this)}
                readDisplayName={readDisplayName.bind(this)}
                readPass={readPass.bind(this)}
                signUpButtonEnabled={signUpButtonEnabled}
            />

            {formUnFilled && <Text style={{color: 'red'}}>Please fill the fields</Text>}
            {!correctEmail && <Text style={{color: 'red'}}>Email is not correct</Text>}

            <LoginButton/>
        </KeyboardAvoidingScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e0e0e0",
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 16,
        justifyContent: 'center',
    },
    signinText: {
        fontSize: 16,
        fontWeight: "500"
    }
});
