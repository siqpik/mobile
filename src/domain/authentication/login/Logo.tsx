import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../style/styles';
import FastImage from "react-native-fast-image";


export default () =>
    <View style={styles.container}>
        <FastImage
            style={{width: 130, height: 130}}
            source={require('../../../../assets/icon.png')}
        />
        <Text style={styles.logoText}>Siqpik</Text>
    </View>