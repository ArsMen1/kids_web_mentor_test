<script>
import axios from 'axios';

export default {
  data() {
    return {
      forgot: 'Forgot password?',
      user: localStorage?.user,
      email: '',
      password: '',
    }

  },
  methods: {
    auth() {
      axios.post(`/login`, { email: this.email, password: this.password })
        .then(({ data }) => { localStorage.user = JSON.stringify(data) })
      location.reload()
    }
  }
}
</script>

<template>
  <div v-if="!user" id="subscribe">
    <div>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <input v-model="email" type="email" id="form2Example1" class="form-control"
          placeholder="praktikum@support.yandex.ru" />
        <label class="form-label" for="form2Example1">Email</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input v-model="password" type="password" id="form2Example2" class="form-control" placeholder="1234" />
        <label class="form-label" for="form2Example2">Пароль</label>
      </div>
      <h2 class="errorMessage" v-if="errorAuth">Неверно введен логин или пароль</h2>
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> Remember me </label>
          </div>
        </div>

        <div class="col">
          <a href="#" @click="forgot = 'Не забывай'">{{ forgot }}</a>
        </div>
      </div>

      <!-- Submit button -->
      <button @click="auth" class="btn btn-primary btn-block mb-4">Sign in</button>
    </div>
  </div>
  <div v-else>
    <h1>
      {{ JSON.parse(this.user)?.name }} ты уже подписался!
    </h1>
    <ul class="list-group my-3">
      <li class="list-group-item friend my-2">
        <div class="username">
          ссылка на публичный репозиторий с исходниками этого приложения - <a
            href=" https://github.com/ArsMen1/kids_web_mentor_test"> https://github.com/ArsMen1/kids_web_mentor_test</a>
        </div>
      </li>
      <li class="list-group-item friend my-2">
        <div class="username">
          <iframe width="100%" height="600px" src="https://www.youtube.com/embed/GtSp-PPdCCc" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </li>
    </ul>

  </div>
</template>

<style scoped>
#subscribe {
  width: 76%;
  margin: 5% auto;
}

.errorMessage {
  color: rgb(239, 67, 67);
}
</style>