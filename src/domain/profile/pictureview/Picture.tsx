import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from "react-native"
import {styles} from "./style/styles"
import PagerView from "react-native-pager-view";
import FastImage from "react-native-fast-image";
import WallPost from "@/src/domain/home/components/Post";
import {User} from "@/src/domain/profile/model/User";

export default (props: { route: { params: { posts: any; user: User; index: any; deletePost: any; }; }; navigation: { (arg0: string, arg1: { userName?: string | undefined; screenName?: string | undefined; }): void; navigate?: any; }; }) => {

    const {posts, user, index, deletePost} = props.route.params;

    /*const changeProfilePic = pidId =>
        post('/profile/changeProfilePic/' + pidId)
            .then(resp => {
                if (resp.status === 200) {
                    console.log(resp.status);
                }
            }).catch(error => alert(error));*/

    const getPics = () => posts.map((post, index) =>
        <View key={index + 'pictureView'}>
            <Text style={styles.userTop}>{user.userName}</Text>

            <FastImage source={{uri: post.mediaUrl}} style={styles.pic}/>
            {user.isLoggedUser ?
                <View style={styles.buttonContainer} style={styles.titleContainer}>

                    {/*<TouchableOpacity onPress={() => changeProfilePic(pic.id)}
                                  style={styles.delete_button}>
                    <Text>Make Profile Picture</Text>
                </TouchableOpacity>*/}
                    {<TouchableOpacity onPress={() => {
                        props.navigation.navigate("Profile")
                        deletePost()(post.id)
                    }}
                                       style={styles.delete_button}>
                        <Text>Delete</Text>
                    </TouchableOpacity>}
                </View> :
                <View></View>
            }
            <ScrollView style={styles.commentContainer} alwaysBounceHorizontal={false}>
                <Text style={styles.date}>{post.date}</Text>
                {/**getComments(pic)*/}
            </ScrollView>
        </View>
    )

    /*const getComments = (pic) => pic.comments.map((post, index) =>
        <View key={index} style={styles.comments}>
            <Text style={styles.user}>{post.userName}</Text>
            <Text style={styles.comment}>{post.comments}</Text>
        </View>
    )*/

    return (
        <View style={styles.container}>
            <PagerView style={styles.takenPic} initialPage={index} showPageIndicator={false}
                       orientation={'horizontal'}>
                {getPics()}
            </PagerView>
        </View>
    )
}
