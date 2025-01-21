<template>
    <div>
      <div class="d-flex justify-content-between m-3">
          <h1>Connections</h1>
          <router-link class="btn btn-primary" to="/create-connection">Create</router-link>
        </div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Bio</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="connection in connections" :key="connection.id">
                    <td>{{ connection._id }}</td>
                    <td>{{ connection.name }}</td>
                    <td>{{ connection.email }}</td>
                    <td>{{ connection.phone }}</td>
                    <td>{{ connection.bio }}</td>
                    <td>
                      <router-link class="btn btn-primary" :to="'/view-connection/'+connection._id">View</router-link>
                      <router-link class="btn btn-success" :to="'/update-connection/'+connection._id">Edit</router-link>
                      <button type="button" class="btn btn-danger" @click="deleteConnection(connection._id)">Delete</button>
                    </td>
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
      connections: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await userClient.get('/users');
      this.connections = response.data;
    },
    async deleteConnection(id) {
      await userClient.delete(`/users/${id}`);
      this.connections = this.connections.filter(user => user._id!=id);
    }
  },
};
</script>
  