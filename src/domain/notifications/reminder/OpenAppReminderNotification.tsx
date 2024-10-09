import notifee, {RepeatFrequency, TimestampTrigger, TriggerType} from '@notifee/react-native'

export default async function onCreateTriggerNotification() {
    const date = new Date();
    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0.5)

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
        repeatFrequency: RepeatFrequency.DAILY
    };

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
        {
            title: 'Siqpik awaits for you: ',
            body: 'Come see the real world',
            android: {
                channelId
            },
        },
        trigger,
    );
}