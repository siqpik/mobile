import notifee, {
    AndroidBadgeIconType,
    AndroidImportance,
    AndroidVisibility,
    RepeatFrequency,
    TimestampTrigger,
    TriggerType
} from '@notifee/react-native'
import NotificationSounds from 'react-native-notification-sounds';

export default async function createOpenAppReminderNotification() {
    const date = new Date();
    date.setHours(8);
    date.setMinutes(0)
    date.setSeconds(1)

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + 500,//date.getTime()
        repeatFrequency: RepeatFrequency.DAILY
    };

    const sounds = await NotificationSounds.getNotifications('notification');

    console.log(JSON.stringify(sounds[0]))

    const channelId = await notifee.createChannel({
        id: 'open-app-reminder',
        name: 'open-app-reminder',
        sound: sounds[0].url,
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
        {
            title: 'Come see the real world!',
            body: 'Tap to check',
            android: {
                channelId,
                smallIcon: 'siqpik_notification_icon',
                badgeIconType: AndroidBadgeIconType.LARGE,
                badgeCount: 1,
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC,
                pressAction: {
                    id: 'default'
                }
            },
        },
        trigger,
    );
}