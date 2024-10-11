import notifee from "@notifee/react-native";

notifee.displayNotification({
    title: 'New notification',
    android: {
        channelId: '',
        pressAction: {
            id: 'default',
            mainComponent: 'custom-component',//This used to ope AlertBeforePic
        },
    },
});

//TODO check interation page in Notifee page