import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';

import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useIsFocused, useNavigation} from "@react-navigation/native"
import CameraButtons from "./CameraButtons";
import styles from '../shared/styles/styles';

export default () => {

    const navigation = useNavigation();
    const BACK = 'back'
    const FRONT = 'front'

    const [cameraPosition, setCameraPosition] = useState<typeof FRONT | typeof BACK>(BACK);
    const [flash, setFlash] = useState<boolean>(false);
    const device = useCameraDevice(cameraPosition)

    const [hasPermission, setHasPermission] = useState(false)
    const isFocused = useIsFocused()
    const camera = useRef<Camera>(null)

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission()
            setHasPermission(status === 'granted')
        })()
    }, [])

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
            <View style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
                marginTop: '21%'
            }}>
                {hasPermission && (
                    <>
                        <Camera
                            ref={camera}
                            style={styles.cameraView}
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