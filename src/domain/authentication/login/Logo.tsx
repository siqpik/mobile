import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../style/styles';


export default () =>
    <View style={styles.container}>
        <Image
            style={{width: 130, height: 130}}
            source={require('../../../../assets/icon.png')}
        />
        <Text style={styles.logoText}>Siqpik</Text>
    </View>