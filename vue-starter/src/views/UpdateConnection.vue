<template>
    <div>
        <div class="card">
            <div class="card-header">
                Create Connection
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input class="form-control" type="text" v-model="form.name">
                    <span class="form-field-error" v-if="errors.name">{{ errors.name }}</span>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input class="form-control" type="text" v-model="form.email">
                    <span class="form-field-error" v-if="errors.email">{{ errors.email }}</span>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phone</label>
                    <input class="form-control" type="text" v-model="form.phone">
                    <span class="form-field-error" v-if="errors.phone">{{ errors.phone }}</span>
                </div>

                <div class="mb-3">
                    <label class="form-label">Bio</label>
                    <textarea class="form-control" v-model="form.bio"></textarea>
                </div>

                <div class="mb-3">
                    <button type="submit" class="btn btn-primary" @click="updateConnection()">Update</button>
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
        form: {
            name: '',
            email: '',
            phone: '',
            bio: '',
      },
      id: '',
      errors: {},
      submitted: false,
    };
  },
  mounted() {    
    this.getConnection(this.$route.params.id)
  },
  methods: {
    async getConnection(id) {
        const response = await userClient.get('/users/'+id);
        const user = response.data

        this.id = user._id
        this.form.name = user.name
        this.form.email = user.email
        this.form.phone = user.phone
        this.form.bio = user.bio
    },
    async updateConnection() {
        this.errors = {};

        if (!this.form.name) {
            this.errors.name = "Name is required.";
        }
        
        if (!this.form.email) {
            this.errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
            this.errors.email = "Email is invalid.";
        }

        if (!this.form.phone) {
            this.errors.name = "Phone is required.";
        }

        if (Object.keys(this.errors).length === 0) {
            await userClient.put('/users/'+this.id, this.form);
            this.$router.push('/connections')   
        }
    }
  },
};
</script>
  