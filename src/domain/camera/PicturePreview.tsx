import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from "./style/styles";
import {useNavigation} from '@react-navigation/native';
import {uploadMedia} from "../service/ApiService";
import mime from "mime";
import CountDown from "./CountDown";
import {useAppDispatch} from "../../config/hooks";
import {errorSearchingFeed, reset, searchingFeed, successSearchingFeed} from "../home/modules/feedSlice";
import {fetchFeed} from "@/src/domain/home/modules/feedService";

export default props => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation();

    const imageUri = "file:///" + props.route.params.state.image.path.split("file:/").join("")
    const [isPosting, setIsPosting] = useState(false)

    function postMedia(imagePath: string) {
        setIsPosting(true)

        uploadMedia(getFormData(imagePath))
            .then(response => {
                if (response.status !== 201) {
                    throw new Error(response.status)
                }

                dispatch(reset())
                getFeed()

                setIsPosting(false)
            })
            .catch(error => console.log("Something went wrong posting: " + error))
            .then(() => navigation.navigate("Siqpik"))
    }

    const getFeed = () => fetchFeed(
        1,
        () => dispatch(searchingFeed()),
        payload => dispatch(successSearchingFeed(payload)),
        () => dispatch(errorSearchingFeed())
    )

    function getFormData() {
        const fd = new FormData();
        fd.append('pic', {
            uri: imageUri,
            type: mime.getType(imageUri),
            name: imageUri.split("/").pop()
        });

        return fd;
    }

    return (
        <View style={styles.preview}>
            <View style={styles.container}>
                <ImageBackground source={{
                    uri: isPosting //TODO: PUT A FKNG Gif
                        ? 'https://yt3.googleusercontent.com/I0EJdMK29arMwh0_ef9lHPYOID3izmqBKCAxDWX3I-3IrRsTc-kKQ1xymRIa1O2IxW6Zjo7kuQ=s900-c-k-c0x00ffffff-no-rj'
                        : `file://${props.route.params.state.image.path}`
                }}
                                 style={styles.takenPic}>
                    {!isPosting && <View style={styles.countdown}>
                        <CountDown
                            until={60 * 3}
                            size={40}
                            onFinish={() => navigation.navigate('Siqpik')}
                            digitStyle={{borderWidth: 0, borderColor: '#000',}}
                            digitTxtStyle={{color: '#fff'}}
                            separatorStyle={{color: '#fff'}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: null, s: null}}
                            showSeparator
                        />
                        <View style={styles.previewButtonsContainer}>
                            <TouchableOpacity style={styles.previewButtons} onPress={() => {
                                postMedia(imageUri)
                            }}>
                                <Text style={styles.buttonText}>Post!</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.previewButtons} title={'Discard'} onPress={() => {
                                props.navigation.navigate('Siqpik')
                            }}>
                                <Text style={styles.buttonText}>Discard</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                </ImageBackground>
            </View>
        </View>
    )
}