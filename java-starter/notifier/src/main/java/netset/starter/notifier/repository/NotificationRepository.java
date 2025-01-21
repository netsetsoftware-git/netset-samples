package netset.starter.notifier.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import netset.starter.notifier.entity.Notification;

@CrossOrigin
public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
