import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import Notification, {AdmireRequestStatus, NotificationStatus, NotificationType} from './model/Notification';
import {deleteItem, getJson, patch} from '../service/ApiService';
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
        const notifs = await getJson('/notification')
        return await Promise.all(
            notifs.map(async n => await getAdmireRequests(n))
        ).then(admireRequestsNotifications => admireRequestsNotifications
            .filter(n => n !== null)
            .filter(n => n.admireRequestStatus !== AdmireRequestStatus.DISMISSED)
        )
    }

    const getAdmireRequests = notification => getJson(`/admire-request/${notification.eventId}`)
        .then(admireRequest => null !== admireRequest
            ? new Notification(notification, admireRequest)
            : null
        )

    const clearNewNotifications = () => notifications
        .filter(notification => NotificationStatus.NEW === notification.notificationStatus)
        .map(notification => notification.id)
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
            setNotifications(prevNotifications => prevNotifications.filter(n => n.notifiableId !== requestId))
        })

    const goToProfile = (username: string) => navigation
        .navigate('ProfileOther', {
            userName: username
        })

    return (
        notifications
            ? <ScrollView>
                {notifications
                    .map((notification, index) =>
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