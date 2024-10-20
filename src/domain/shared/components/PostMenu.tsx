import {MenuView} from "@react-native-menu/menu";
import {Platform, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import React from "react";

export default () =>
    <MenuView
        style={{position: "absolute", top: 20, right: 20}}
        title="Menu Title"
        onPressAction={({nativeEvent}) => {
            console.warn(JSON.stringify(nativeEvent));
            if (nativeEvent.event === 'delete') {
                alert('Eliminando...')
            }
        }}
        actions={[
            /*{
                id: 'add',
                title: 'Add',
                titleColor: '#2367A2',
                image: Platform.select({
                    ios: 'plus',
                    android: 'ic_menu_add',
                }),
                imageColor: '#2367A2',
                subactions: [
                    {
                        id: 'nested1',
                        title: 'Nested action',
                        titleColor: 'rgba(250,180,100,0.5)',
                        subtitle: 'State is mixed',
                        image: Platform.select({
                            ios: 'heart.fill',
                            android: 'ic_menu_today',
                        }),
                        imageColor: 'rgba(100,200,250,0.3)',
                        state: 'mixed',
                    },
                    {
                        id: 'nestedDestructive',
                        title: 'Delete',
                        attributes: {
                            destructive: true,
                        },
                        image: Platform.select({
                            ios: 'trash',
                            android: 'ic_menu_delete',
                        }),
                    },
                ],
            },
            {
                id: 'share',
                title: 'Share Action',
                titleColor: '#46F289',
                subtitle: 'Share action on SNS',
                image: Platform.select({
                    ios: 'square.and.arrow.up',
                    android: 'ic_menu_share',
                }),
                imageColor: '#46F289',
                state: 'on',
            },*/
            {
                id: 'delete',
                title: 'Delete',
                attributes: {
                    destructive: true,
                },
                image: Platform.select({
                    ios: 'trash',
                    android: 'ic_menu_delete',
                }),
            },
        ]}
        shouldOpenOnLongPress={false}
    >
        <View>
            <Entypo name="dots-three-horizontal" size={24} color="black"/>
        </View>
    </MenuView>