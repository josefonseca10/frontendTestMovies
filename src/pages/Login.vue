<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <form @submit.prevent="onLogin()">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model.trim="email">
            <div class="error" v-if="errors.email">
              {{errors.email}}
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model.trim="password">
            <div class="error" v-if="errors.password">
              {{errors.password}}
            </div>
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {LOGIN_ACTION} from "@/store/storeConstants";
import LoginValidations from "@/services/loginValidations";
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router";
const notification = useNotification()

export default {
  name: "LoginComponent",
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  beforeRouteLeave() {
    console.log('roteleabe', this.$store)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log('roteenter111')
      console.log('roteenter', vm.$store)
    });
  },
  methods: {
    ...mapActions('login', {
      login: LOGIN_ACTION
    })
  ,
  cleanForm() {
    this.email = "";
    this.password = "";
    this.errors = [];
  },
    async onLogin() {
      let validations = new LoginValidations(this.email, this.password);
      this.errors = validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false
      }
      try {
        const response = await this.login({
          email: this.email,
          password: this.password,
        })
        console.log('dkfkfkf', JSON.stringify(response))
        if (response.data.error) {
          notification.notify({
            title: "Error ☠️",
            duration: 5000,
            text: `${response.data.message}`,
            type: 'error',
            speed: 1000
          });
          return
        }
        if (response.status === 200 && response.data.data.token) {
          notification.notify({
            title: "User login 🎉",
            duration: 5000,
            text: `Welcome ${response.data.data.fullName}.`,
            type: 'success',
            speed: 1000
          });
          localStorage.setItem('token', response.data.data.token);
          this.cleanForm();
          await router.push('/movies');

        }
      } catch (e) {
        console.log('eerrloigin', e.response)
        if (e.response.data.status === 404 && e.response.data) {
          notification.notify({
            title: "Error ☠️",
            duration: 5000,
            text: `${e.response.data}`,
            type: 'error',
            speed: 1000
          });
          return;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>