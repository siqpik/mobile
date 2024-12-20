import {Dimensions, StyleSheet} from "react-native";

export default StyleSheet.create({
    wallPic: {
        flex: 1,
        resizeMode: 'cover',
        height: Dimensions.get('screen').height / 1.7,
        width: Dimensions.get('screen').width,
        alignSelf: 'center',
    },
    picPreview: {
        flex: 1,
        resizeMode: 'cover',
        height: Dimensions.get('screen').height / 1.7,
        width: Dimensions.get('screen').width,
        alignSelf: 'center',
        paddingBottom: 5
    },
    cameraView: {
        resizeMode: 'cover',
        height: Dimensions.get('screen').height / 1.5,
        width: Dimensions.get('screen').width,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingTop: 55
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    post: {
        flex: 1,
        flexDirection: 'column',
        height: 380,
        alignSelf: 'stretch',
        borderStyle: 'solid'
    },
    countdown: {
        flex: 1.2,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: "100%",
        justifyContent: "space-around",
        marginBottom: "5%"
    },
    alertContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: Dimensions.get('window').height
    },
    alertText: {
        flex: 2,
        justifyContent: "flex-end",
        alignItems: "center",

    },
    rules: {
        flex: 2,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '2%',

    },
    rulesText: {
        fontSize: 20,
        margin: '2%'
    },
    title: {
        flex: .2,
        fontSize: 25,
        marginTop: '5%'
    },
    capture: {
        width: '10%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    alertButtons: {
        flex: .8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
    },
    button: {
        width: 100,
        backgroundColor: '#000',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    buttonHome: {
        width: 200,
        backgroundColor: '#000',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
    removeWarning: {
        height: 30,
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: '10%',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    removeWarningText: {
        fontSize: 15,
        marginHorizontal: '5%'
    },
    previewButtonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "flex-end",
        width: '100%',
        paddingBottom: '12%'
    },
    previewButtons: {
        width: 100,
        height: 55,
        backgroundColor: '#000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
    }
})