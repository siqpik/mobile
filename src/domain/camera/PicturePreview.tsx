import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from "./../shared/styles/styles";
import {useNavigation} from '@react-navigation/native';
import {uploadMedia} from "../service/ApiService";
import mime from "mime";
import CountDown from "./CountDown";
import {useAppDispatch} from "../../config/hooks";
import {errorSearchingFeed, reset, searchingFeed, successSearchingFeed} from "../home/modules/feedSlice";
import {fetchFeed} from "@/src/domain/shared/feedService";

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
            {!isPosting &&
                <CountDown
                    until={60 * 3}
                    size={40}
                    onFinish={() => navigation.navigate('Siqpik')}
                    digitStyle={{borderWidth: 0, borderColor: '#000',}}
                    digitTxtStyle={{color: '#000'}}
                    separatorStyle={{color: '#000'}}
                    timeToShow={['M', 'S']}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                />
            }
            <ImageBackground source={{
                uri: isPosting
                    ? 'https://www.stripersonline.com/surftalk/uploads/monthly_2021_02/loading.gif.89b2096f8e6af0dc8cac58c5683938dd.gif'
                    : `file://${props.route.params.state.image.path}`
            }}
                             style={styles.picPreview}
            >
            </ImageBackground>
            {!isPosting &&
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
            }
        </View>
    )
}