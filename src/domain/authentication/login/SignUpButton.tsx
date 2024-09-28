import {styles} from "../style/styles";
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default () => {

    const navigation = useNavigation();

    return <View style={styles.signupTextCont}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}> Signup</Text>
        </TouchableOpacity>
    </View>
}