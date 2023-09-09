import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from "@react-navigation/native"
import CameraButtons from "./CameraButtons";

export default props => {

    const devices = useCameraDevices()
    const [device, setDevice] = useState(devices.back)
    const [hasPermission, setHasPermission] = useState(false)
    const isFocused = useIsFocused()
    const camera = useRef(null)
    const takePhotoOptions = {
        qualityPrioritization: 'speed',
        flash: 'off'
    };

    useEffect(() => setDevice(devices.back), [devices])

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

        return currentCamera.takePhoto(takePhotoOptions)
            .then(media => props.navigation.navigate('Preview', {state: {image: media}}))
    };

    const flipCamera = () => setDevice(device === devices.back ? devices.front : devices.back)

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
