import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused, useNavigation} from "@react-navigation/native"
import CameraButtons from "./CameraButtons";

export default () => {

    const navigation = useNavigation();
    const BACK = 'back'
    const FRONT = 'front'

    const devices = useCameraDevices()
    const [cameraPosition, setCameraPosition] = useState<typeof FRONT | typeof BACK>(BACK);
    const [flash, setFlash] = useState<boolean>(false);
    const device = devices[cameraPosition];

    const [hasPermission, setHasPermission] = useState(false)
    const isFocused = useIsFocused()
    const camera = useRef<Camera>(null)

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission()
            setHasPermission(status === 'authorized')
        })();
    }, []);

    const takePhoto = async () => {
        const currentCamera = camera.current;

        if (currentCamera == null) {
            console.log('Camera Ref is Null');
        }

        const media = await currentCamera.takePhoto({
            qualityPrioritization: 'speed',
            flash: flash ? 'on' : 'off'
        });
        return navigation.navigate('Preview', {state: {image: media}});
    };

    const flipCamera = () => setCameraPosition(cameraPosition === BACK ? FRONT : BACK)
    const toggleFlash = () => setFlash(!flash)

    return device
        ? (
            <View style={{flex: 1}}>
                {hasPermission && (
                    <>
                        <Camera
                            ref={camera}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={isFocused}
                            photo={true}
                        />
                        <CameraButtons
                            takePicture={takePhoto}
                            flipCamera={flipCamera}
                            toggleFlash={toggleFlash}
                            flash={flash}
                        />
                    </>
                )}
            </View>
        )
        : (
            <View>
                <Text style={{color: '#030303'}}>Camera device not detected</Text>
            </View>
        )
}