export const unreadNotification = (notifications) => {
    console.log(notifications)
  return notifications.filter((n) => n.isRead === false)
}

