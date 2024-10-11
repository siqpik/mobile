import notifee, {EventType, RepeatFrequency, TimestampTrigger, TriggerType} from '@notifee/react-native'

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    console.log(">>>>>>>> " + JSON.stringify(notification))
    console.log("<<<<<<<< " + pressAction)
    console.log(">>>>>>>> " + type)

    if (EventType.PRESS){
        console.log("Should open the fkin app :(")
    }
});

export default async function onCreateTriggerNotification() {
    const date = new Date();
    date.setHours(21);
    date.setMinutes(44)
    date.setSeconds(1)

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + 500,//date.getTime()
        repeatFrequency: RepeatFrequency.DAILY
    };

    const channelId = await notifee.createChannel({
        id: 'open-app-reminder',
        name: 'open-app-reminder',
    });

    notifee.setBadgeCount(11).then(() => console.log('Badge count set!'));

    notifee
        .incrementBadgeCount(3)
        .then(() => notifee.getBadgeCount())
        .then(count => console.log('Badge count incremented by 1 to: ', count));

    // Create a trigger notification
    await notifee.createTriggerNotification(
        {
            title: 'Come see the real world!',
            body: 'Tap to check',
            android: {
                channelId,
                smallIcon: 'siqpik_notification_icon',
                pressAction: {
                    id: 'default'
                }
            },
        },
        trigger,
    );
}