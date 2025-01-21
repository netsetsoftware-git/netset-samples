package netset.starter.notifier.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import netset.starter.notifier.entity.Notification;
import netset.starter.notifier.models.NotifyEvent;
import netset.starter.notifier.repository.NotificationRepository;

@Component
public class NotifyEventListener {
	
	@Autowired
	private NotificationRepository repository;
	
	@RabbitListener(queues = "notify_connections_q")
    public void handleMessage(NotifyEvent notify) {
        System.out.println("Received new notify event: " + notify);
        
        Notification notification = new Notification();
        notification.setNotificationType(notify.notificationType());
        notification.setNotificationBody(notify.notificationBody());
        notification.setUsers(notify.connections());
        
        repository.save(notification);
    }
}
