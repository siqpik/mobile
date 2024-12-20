import {TouchableOpacity, View} from "react-native";
import {styles} from "./style/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import IonIcon from 'react-native-vector-icons/Ionicons';

export default props => (
    <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => props.flipCamera()}
                          style={styles.capture}>
            <IonIcon
                name="camera-reverse"
                color="black"
                size={45}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.takePicture()}
                          style={styles.capture}>
            <Icon
                name="circle-thin"
                size={55}
                color="black"
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.toggleFlash()}
                          style={styles.capture}>
            <IonIcon
                name={props.flash ? "flash-outline" : "flash-off-outline"}
                color="black"
                size={45}
            />
        </TouchableOpacity>

    </View>
);
