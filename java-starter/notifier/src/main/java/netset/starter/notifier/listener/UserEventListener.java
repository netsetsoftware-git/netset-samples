package netset.starter.notifier.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import netset.starter.notifier.models.User;

@Component
public class UserEventListener {

	//@RabbitListener(queues = "hello_q")
    public void handleMessage(User user) {
        System.out.println("Received message: " + user);
        
    }
}
