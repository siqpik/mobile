import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {logout} from '../service/AuthenticationService';
import {useAppDispatch} from "../../config/hooks";
import {reset} from "@/src/domain/feed/modules/feedSlice";
import Profile from "../profile/ProfileScreen";

const CustomDrawerContent = props => {
    const dispatch = useAppDispatch()

    return (
        <DrawerContentScrollView keyboardShouldPersistTaps='always' {...props}>

            <DrawerItem label="Log out" onPress={() => logout().then(() => {
                dispatch(reset())
                props.navigation.popToTop();
                props.navigation.navigate('Login')
            })}/>
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator()

export default () => (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} options={{title: 'My home'}} screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        backgroundColor: '#efc6d4',
        width: 40,
    }}>
        <Drawer.Screen name="Profile" component={Profile}/>
    </Drawer.Navigator>
)
