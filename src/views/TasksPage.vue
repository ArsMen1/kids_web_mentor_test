<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            tasks: []
        }
    },
    mounted() {
        this.loadTasks();
    },

    methods: {
        async loadTasks() {
            let response = await axios.get('/tasks');
            this.tasks = response.data;
        },

        getRelativeDate(date) {
            let day = dayjs(date);

            return day.fromNow();
        }
    }
}
</script>


<template>
    <div class="tasks-page">
        <h3>Задания</h3>

        <div class="tasks-container">
            <article class="post card my-3" v-for="(item, index) in tasks">
                <div class="card-body">
                    <header class="post-header mb-1">

                        <img :src="'src/avatars/' + item.author.avatar" class="user-avatar">
                        <div class="post-author">
                            {{ item.author.firstName }} {{ item.author.lastName }}
                        </div>
                        <div class="post-date">
                            {{ getRelativeDate(item.createdAt) }}
                        </div>

                    </header>


                    <div class="card-text">
                        {{ item.content }}
                    </div>

                </div>

            </article>
        </div>
    </div>
</template>


<style>
.tasks-page .item-avatar {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    background-color: white;
    border-radius: 100%;
}

.tasks-page .post-header {
    display: flex;
    align-items: center;
}

.tasks-page .post-author {
    font-weight: bold;
}

.tasks-page .post-date {
    margin-left: auto;
    font-size: 14px;
    color: #6c757d;
}
</style>