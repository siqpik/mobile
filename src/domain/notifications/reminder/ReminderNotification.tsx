import notifee, {AndroidImportance} from '@notifee/react-native'

export default () => {

    const channel = async () => await notifee.createChannel({
        id: '1',
        name: "Reminder",
        sound: 'default',
        importance: AndroidImportance.HIGH,
        vibration: true
    })

    const displayConfig = async () => await notifee.displayNotification({
        id: '1',
        title: 'Reminder Test',
        body: 'Reminder test notification, hpta',

    })

    return {}
}