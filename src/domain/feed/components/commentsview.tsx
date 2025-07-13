import {View} from "react-native";
import {styles} from "@/src/domain/feed/style/styles";
import React from "react";

export default () =>
    <View style={styles.postDescription}>
        <View style={styles.comments}>
            {/*<TextInput style={styles.commentInput}
                               onChangeText={comment => setComment(comment)}
                               value={comment}
                               onSubmitEditing={() => {
                                   comment ? (props.commentPost(props.id, comment), setComment('')) : setComment('')
                               }}
                    />
                    {comment ?
                        <Icon name="rocket1"
                              size={30}
                              color="black"
                              onPress={() => {
                                  props.commentPost(props.id, comment);
                                  setComment('');
                              }}
                        />
                        :
                        <Icon name="rocket1" size={30} color="white"/>}*/}
        </View>
    </View>

//{
/*props.comments.length >= 1 ?
    <View style={styles.firstCommentContainer}>
        <View style={styles.firstComment}>
            <Text style={styles.postUserName}>
                {props.comments[0].username}: <Text></Text>
            </Text>
            <Text style={styles.postFirstComment}>
                {props.comments[0].comments}
            </Text>
        </View>
        {props.comments[1] ?
            <TouchableOpacity style={styles.firstComment}
                              onPress={() => props.navigate(
                                  'PostComments', {
                                      comments: props.comments
                                  })}
            >
                <Text style={styles.postFirstComment}>
                    View all {props.comments.length} comments
                </Text>
            </TouchableOpacity>
            :
            <View style={styles.firstCommentContainer}>
                <Text style={styles.firstComment}> </Text>
            </View>
        }
    </View>
    :
    <View style={styles.firstCommentContainer}>
        <Text style={styles.firstComment}> </Text>
    </View>*/