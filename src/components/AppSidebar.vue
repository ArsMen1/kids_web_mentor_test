<script>
export default {
    methods: {
        goProfile() {
            this.$router.push({ name: 'profile' });
        },
        goTasks() {
            this.$router.push({ name: 'links' });
        },
        goLogin() {
            this.$router.push({ name: 'login' });
        },
        goLogout() {
            this.$router.push({ name: 'logout' });
        },
        goExperience() {
            this.$router.push({ name: 'experience' });
        }
    }
}
</script>
<template>
    <div class="app-sidebar">
        <ul>
            <li>
                <button class="btn btn-outline-secondary btn-logo" @click="goProfile">
                    <img src="../assets/img/dontdonothing.png" alt="logo">
                </button>
            </li>
            <li>
                <button class="btn btn-outline-secondary" @click="goProfile" :class="{
                    'active': $route.name == 'profile'
                }">
                    Моя страница
                </button>
            </li>
            <li>
                <button class="btn btn-outline-secondary" @click="goExperience" :class="{
                    'active': $route.name == 'experience'
                }">
                    Опыт
                </button>
            </li>
            <li>
                <button class="btn btn-outline-secondary" @click="goLogin" :class="{
                    'active': $route.name == 'login'
                }">
                    Подписка
                </button>
            </li>
            <li>
                <button class="btn btn-outline-secondary" @click="goTasks" :class="{
                    'active': $route.name == 'tasks'
                }">
                    Связь
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.app-sidebar ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
}

.app-sidebar li {
    list-style-type: none;
    width: 100%;
}

.app-sidebar button {
    width: 100%;
}

.app-sidebar .btn-logo img {
    width: 50%;
}
</style>