<script>

export default {
    data() {
        return {
            name: '',
            surname: '',
            linkTG: '',
            errorMessage: '',
            invalidCheck: false,
            feedbackText: ''
        }
    },
    methods: {
        send() {
            if (username && password) {
                errorMessage = ''
                //здесь проще всего было сделать отправку в тг
            } else {
                errorMessage = 'Form not filled properly'
            }
        }
    }
}
</script>

<template>
    <div class="links-page">
        <h3>Вы можете написать мне в <a href="https://t.me/main_Dev"> TG</a> </h3>
        <h4>Или заполнить форму обратной связи:</h4>

        <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
                <label for="validationName" class="form-label">Имя</label>
                <input v-model="name" type="text" class="form-control" id="validationName">
                <div class="errorMessage" v-if="!name">
                    Введите имя
                </div>
            </div>
            <div class="col-md-4">
                <label for="validationSurname" class="form-label">Фамилия</label>
                <input v-model="surname" type="text" class="form-control" id="validationSurname">
                <div class="errorMessage" v-if="!surname">
                    Введите фамилию
                </div>
            </div>
            <div class="col-md-4">
                <label for="linkTG" class="form-label">TG</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" class="form-control" id="linkTG" aria-describedby="inputGroupPrepend">
                </div>
            </div>
            <div class="col-md-12">
                <label for="feedbackText" class="form-label">Готов ответить на любые вопросы — спрашивайте</label>
                <input v-model="feedbackText" type="text" class="form-control" id="feedbackText">
                <div class="errorMessage" v-if="!feedbackText">
                    Пожалуйста, напишите мне сообщение.
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input v-model="invalidCheck" class="form-check-input" type="checkbox" value="" id="invalidCheck">
                    <label class="form-check-label" for="invalidCheck">
                        Примите условия и соглашения
                    </label>
                </div>
            </div>
            <div class="col-12">

                <div v-if="name && surname && invalidCheck && feedbackText" @click='send()' class="btn btn-primary">
                    Отправить форму
                </div>
            </div>
            <div v-if="errorMessage">Возникла ошибка при отправке, но вы всегда можете написать мне в <a
                    href="https://t.me/main_Dev"> TG</a></div>
        </form>

    </div>
</template>

<style scoped>
.links-page .item-avatar {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    background-color: white;
    border-radius: 100%;
}

.errorMessage {
    color: rgb(239, 67, 67);
}
</style>