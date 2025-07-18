import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import Notification, {AdmireRequestStatus, NotificationStatus, NotificationType} from './model/Notification';
import {deleteItem, getJson, patch} from '../../service/ApiService';
import {AdmireRequestNotification} from "./AdmireRequestNotification";
import {useNavigation} from "@react-navigation/native";

export default () => {

    const navigation = useNavigation();

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getAllNotifications()
            .then(ns => setNotifications(ns))
    }, []);

    useEffect(() => {
        clearNewNotifications()
    }, [notifications]);

    const getAllNotifications = async () => {
        const notifications = await getJson('/notification')
        const filtered = notifications.filter(n => null !== n)

        const admireRequests: Notification[] = await getAdmireRequests(filtered)

        return admireRequests
            .filter(ar => ar !== null && ar !== undefined)
            .filter(ar => ar.admireRequestStatus !== AdmireRequestStatus.DISMISSED)
    }

    const getAdmireRequests = async (notifications: any[]) => {
        try {
            const mapped = await Promise.allSettled(
                notifications.map(async (notification) => {
                    const admireRequest = await getJson(`/admire-request/${notification.eventId}`)
                    return admireRequest !== null ? new Notification(notification, admireRequest) : null
                })
            )

            const rret: Notification[] = mapped
                .map(p => p.value)

            return rret
        } catch (error) {
            console.error("Error fetching admire requests:", error);
        }
    }

    const clearNewNotifications = () => notifications
        .filter((notification: Notification) => NotificationStatus.NEW === notification.notificationStatus)
        .map((notification: Notification) => notification.id)
        .forEach(notificationId => patch(`/notification/${notificationId}`, JSON.stringify({status: NotificationStatus.READ})))

    const acceptAdmireRequest = (requestId: string) => patch(`/admire-request/${requestId}`)
        .then(_ => {
            setNotifications(prevNotifications => {
                const notifications = [...prevNotifications];
                const indexToChange = notifications.findIndex(req => req.notifiableId === requestId)

                notifications[indexToChange] = {
                    ...notifications[indexToChange],
                    admireRequestStatus: AdmireRequestStatus.ACCEPTED
                }

                return notifications
            })
        })

    const dismissAdmirerRequest = (requestId: string) => deleteItem(`/admire-request/${requestId}`)
        .then(_ => {
            setNotifications(prevNotifications => prevNotifications.filter((n: Notification) => n.notifiableId !== requestId))
        })

    const goToProfile = (username: string) => navigation
        .navigate('ProfileOther', {
            userName: username
        })

    return (
        notifications
            ?
            <ScrollView>
                {notifications
                    .map((notification: Notification, index) =>
                        notification.type === NotificationType.REQUEST &&
                        <AdmireRequestNotification
                            key={notification.id + index}
                            id={notification.id}
                            username={notification.userInfo.username}
                            image={notification.userInfo.profilePicUrl}
                            status={notification.admireRequestStatus}
                            accept={() => acceptAdmireRequest(notification.notifiableId)}
                            dismiss={() => dismissAdmirerRequest(notification.notifiableId)}
                            goToProfile={() => goToProfile(notification.userInfo.username)}
                        />
                    )
                }
            </ScrollView>
            :
            <Text>_______________________________Nothing to see here :)
                _________________________________</Text>
    );
}