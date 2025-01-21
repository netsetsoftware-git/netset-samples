<template>
    <div>
        <div class="d-flex justify-content-between m-3">
          <h1>Existing Notifications</h1>
        </div>
        
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>creationDate</th>
                    <th>notificationType</th>
                    <th>notificationBody</th>
                    <th>users</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="notification in notifications" :key="notification._id">
                    <td>{{ notification.creationDate }}</td>
                    <td>{{ notification.notificationType }}</td>
                    <td>{{ notification.notificationBody }}</td>
                    <td>
                      <div class="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                        <router-link class="btn btn-outline-success" v-for="user in notification.users" :to="'/view-connection/'+user">
                          {{ user }}
                        </router-link>
                      </div>
                      
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { notificationClient } from '../config/apiClient';

export default {
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await notificationClient.get('/notifications?sort=id,desc');
      this.notifications = response.data._embedded.notifications;
    }
  },
};
</script>
  