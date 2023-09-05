import React, {Component} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {styles} from "./style/styles"
import {post} from '../service/ApiService';
import PagerView from "react-native-pager-view";

export class Picture extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.route.params)
    }

    render() {
        const {posts, username, index, actualUser, deletePost} = this.props.route.params;
        return (
            <View style={styles.container}>

                <PagerView style={styles.takenPic} initialPage={index} showPageIndicator={false}
                           orientation={'horizontal'}>
                    {getPics(posts, actualUser, username, deletePost)}
                </PagerView>
            </View>
        )
    }
}

const changeProfilePic = pidId =>
    post('/profile/changeProfilePic/' + pidId)
        .then(resp => {
            if (resp.status === 200) {
                console.log(resp.status);
            }
        }).catch(error => alert(error));

const getPics = (posts, actualUser, username, deletePost) => posts.map((pic, index) =>
    <View key={index + 'pictureView'}>
        <Text style={styles.userTop}>{username}</Text>

        <Image source={{uri: pic.mediaUrl}} style={styles.pic}/>
        {actualUser ?
            <View style={styles.buttonContainer} style={styles.titleContainer}>

                {/*<TouchableOpacity onPress={() => changeProfilePic(pic.id)}
                                  style={styles.delete_button}>
                    <Text>Make Profile Picture</Text>
                </TouchableOpacity>*/}
                {<TouchableOpacity onPress={() => deletePost()(pic.id)} style={styles.delete_button}>
                    <Text>Delete</Text>
                </TouchableOpacity>}
            </View> :
            <View></View>
        }
        <ScrollView style={styles.commentContainer} alwaysBounceHorizontal={false}>
            <Text style={styles.date}>{pic.date}</Text>
            {/**getComments(pic)*/}
        </ScrollView>

    </View>
)

const getComments = (pic) => pic.comments.map((post, index) =>
    <View key={index} style={styles.comments}>
        <Text style={styles.user}>{post.userName}</Text>
        <Text style={styles.comment}>{post.comments}</Text>
    </View>
)
