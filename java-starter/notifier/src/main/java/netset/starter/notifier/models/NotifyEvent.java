package netset.starter.notifier.models;

import java.util.List;

public record NotifyEvent(String notificationType, String notificationBody, List<String> connections) {}
