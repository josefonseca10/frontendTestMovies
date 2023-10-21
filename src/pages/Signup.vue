<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup</h3>
          <hr />
        </div>
        <form @submit.prevent="signUp()">
          <div class="form-group">
            <label>FirstName</label>
            <input type="text" class="form-control" v-model="firstName">
            <div class="error" v-if="errors.firstName">
              {{errors.firstName}}
            </div>
          </div>
          <div class="form-group">
            <label>LastName</label>
            <input type="text" class="form-control" v-model="lastName">
            <div class="error" v-if="errors.lastName">
              {{errors.lastName}}
            </div>
          </div>
          <div class="form-group">
            <label>UserName</label>
            <input type="text" class="form-control" v-model="username">
            <div class="error" v-if="errors.username">
              {{errors.username}}
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email">
            <div class="error" v-if="errors.email">
              {{errors.email}}
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password">
            <div class="error" v-if="errors.password">
              {{errors.password}}
            </div>
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SignupValidations from "@/services/signupValidations";
import {mapActions} from "vuex";
import {SIGNUP_ACTION} from "@/store/storeConstants";
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router";
const notification = useNotification()
export default {
  name: "SignupComponent",
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),
    async signUp() {
      let validations = new SignupValidations(this.email,
          this.password,
          this.firstName,
          this.lastName,
          this.username,
      );
      this.errors = validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false
      }
      try {
        const response = await this.signup({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
        })
        if (response.status === 200 && response.data.data.username) {
          notification.notify({
            title: "User register 🎉",
            duration: 5000,
            text: `User ${response.data.data.username} register success.`,
            type: 'success',
            speed: 1000
          });
          this.cleanForm();
          await router.push('/login');
          return;
        }
        if (response.status === 200 && response.data.data.errors) {
          notification.notify({
            title: "Error ☠️",
            duration: 5000,
            text: `${response.data.data.errors}`,
            type: 'error',
            speed: 1000
          });
          return;
        }
        console.log('restAAA', response)
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    },
    cleanForm() {
      this.firstName = "";
      this.lastName = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.errors = [];
    }
  }
}
</script>

<style scoped>

</style>