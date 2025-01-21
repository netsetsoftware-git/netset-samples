<template>
    <div>
        <div class="d-flex justify-content-between m-3">
          <h1>Notify Connections</h1>
          <button class="btn btn-success" @click="routeToNotificationView()">Notification Log</button>
        </div>
        
        
        <div v-if="toNotify.length>0" class="card d-flex justify-content-center m-3">
          <div class="card-header">{{ toNotify.length }} Connections selected</div>
          <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Send As</label>
                <select class="form-control" v-model="form.notificationType">
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea class="form-control" type="text" v-model="form.notificationBody"></textarea>

                <span class="form-field-error" v-if="errors.notificationBody">{{ errors.notificationBody }}</span>
            </div>

            <button class="btn btn-success" @click="notify()">Notify</button>
          </div>
        </div>

        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Bio</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="connection in connections" :key="connection._id">
                    <td><input type="checkbox" @click="selectConnections(connection._id)"></td>
                    <td>{{ connection._id }}</td>
                    <td>{{ connection.name }}</td>
                    <td>{{ connection.email }}</td>
                    <td>{{ connection.phone }}</td>
                    <td>{{ connection.bio }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { userClient } from '../config/apiClient';

export default {
  data() {
    return {
      form: {
        notificationType: 'sms',
        notificationBody: ''
      },
      errors: {},
      connections: [],
      toNotify: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    routeToNotificationView() {
      this.$router.push("/view-notification")
    },
    selectConnections(id) {
      const index = this.toNotify.findIndex(userId => userId == id)
      if(index==-1) {
        this.toNotify.push(id)
      } else {
        this.toNotify.splice(index, 1)
      }
    },
    async fetchData() {
      const response = await userClient.get('/users');
      this.connections = response.data;
    },
    async notify() {
      this.errors = {};
      if(this.toNotify.length<=0) return
      if (!this.form.notificationBody) {
          this.errors.notificationBody = "Please enter message.";
      }

      const notification = {
        ...this.form,
        userIds : this.toNotify
      }

      await userClient.post('/notify/'+notification.notificationType, notification);
      this.$router.push("/view-notification")
    },
  },
};
</script>
  