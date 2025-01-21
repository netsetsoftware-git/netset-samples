<template>
    <div>
        <div class="card">
            <div class="card-header">
                Connection {{ connection._id }}
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <label class="form-label">Name: {{ connection.name }}</label>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email: {{ connection.email }}</label>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phone: {{ connection.phone }}</label>
                </div>

                <div class="mb-3">
                    <label class="form-label">Bio: {{ connection.bio }}</label>
                </div>

                <div class="mb-3">
                    <router-link class="btn btn-outline-success" :to="'/update-connection/'+connection._id">
                        Edit
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userClient } from '../config/apiClient';

export default {
  data() {
    return {
      connection : {}
    };
  },
  mounted() {    
    this.getConnection(this.$route.params.id)
  },
  methods: {
    async getConnection(id) {
        const response = await userClient.get('/users/'+id);
        this.connection = response.data
    }
  },
};
</script>
  