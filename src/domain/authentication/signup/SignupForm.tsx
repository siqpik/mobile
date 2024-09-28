import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from "../style/styles";


export const SignupForm = props =>
    <View style={styles.formContainer}>
        <TextInput style={styles.inputBox}
                   placeholder='Email'
                   placeholderTextColor='#000'
                   onChangeText={email => props.readEmail(email)}
                   value={props.email}
        />

        <TextInput style={styles.inputBox}
                   placeholder='Username'
                   placeholderTextColor='#000'
                   onChangeText={userName => props.readUserName(userName)}
                   value={props.username}
        />
        <TextInput style={styles.inputBox}
                   placeholder='Display Name'
                   placeholderTextColor='#000'
                   onChangeText={displayName => props.readDisplayName(displayName)}
                   value={props.displayName}
        />
        <TextInput style={styles.inputBox}
                   placeholder='Password'
                   secureTextEntry={true}
                   placeholderTextColor='#000'
                   onChangeText={pass => props.readPass(pass)}
                   value={props.pass}
        />
        {
            props.signUpButtonEnabled &&
            <TouchableOpacity style={styles.button} onPress={() => props.signInClicked()}>
                <Text style={styles.buttonText}> {props.type} </Text>
            </TouchableOpacity>
        }
    </View>
