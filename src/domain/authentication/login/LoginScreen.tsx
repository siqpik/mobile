import React, {useState} from 'react';
import {Text} from 'react-native';

import Logo from './Logo';
import {Form} from './Form';
import SignUpButton from './SignUpButton';
import {authenticate} from '../../service/AuthenticationService';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import ForgotPasswordButton from "./ForgotPaswordButton";
import {styles} from "../style/styles";
import {useNavigation} from "@react-navigation/native";

export default props => {

    const [userName, setUserName] = useState('')
    const [pass, setPass] = useState('')
    const [hasLoginFailed, setHasLoginFailed] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [formUnFilled, setFormUnFilled] = useState(false)
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(false)

    const navigation = useNavigation();

    const readUserName = (un: React.SetStateAction<string>) => setUserName(un);

    const readPass = (pass: React.SetStateAction<string>) => setPass(pass);

    const loginClicked = () => () => {
        if (!(userName || pass)) {
            setFormUnFilled(true)
        } else {
            setLoginButtonDisabled(true)
            setHasLoginFailed(false)

            authenticate(userName, pass)
                .then(() => navigation.navigate('RootNavigation', {loggedUsername: userName}))
                .catch(() => {
                    setShowSuccessMessage(false)
                    setFormUnFilled(false)
                    setHasLoginFailed(true)
                    setLoginButtonDisabled(false)
                })
        }
    }

    return (
        <KeyboardAvoidingScrollView flex={0} containerStyle={styles.container}>
            <Logo/>
            {props.route.params &&
                <Text style={styles.signupText}>{props.route.params.passResetMessage}</Text>}
            <Form
                type="Login"
                loginClicked={loginClicked.bind(this)}
                userName={userName}
                pass={pass}
                readUserName={readUserName.bind(this)}
                readPass={readPass.bind(this)}
                loginButtonDisabled={loginButtonDisabled}
            />
            {hasLoginFailed && <Text style={{color: 'red'}}>Invalid Credentials</Text>}
            {formUnFilled && <Text style={{color: 'red'}}>Please fill the fields</Text>}
            {showSuccessMessage && <Text>Login Successful</Text>}
            <ForgotPasswordButton/>
            <SignUpButton/>
        </KeyboardAvoidingScrollView>

    );
}