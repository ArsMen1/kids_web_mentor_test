<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isReady: false,

            item: null,
            posts: [],
            postContent: '',

            isCurrentItem: true,
        }
    },

    mounted() {
        this.loadData();
    },

    watch: {
        $route() {
            this.loadData();
        }
    },

    methods: {
        async loadData() {
            this.isReady = false;

            await this.loadItem();
            await this.loadPosts();

            this.isReady = true;
        },

        async loadItem() {
            let response;
            if (this.$route.name == 'profile') {
                this.isCurrentItem = true;
                response = await axios.get('/profile');
            } else {
                response = await axios.get('/item', {
                    params: {
                        itemName: this.$route.params.item
                    }
                });
            }
            this.item = response.data;

        },
        async loadPosts() {
            let response = await axios.get('/items/posts', {
                params: {
                    id: this.item._id
                }
            })

            this.posts = response.data;
        },

        async createPost(evt) {
            evt.preventDefault();
            this.postContent.trim() && await axios.post('/post/create', {
                author: this.item._id,
                content: this.postContent
            });

            this.postContent = '';
            this.loadPosts();
        },
        async deletePost(id) {
            await axios.get('/post/delete', {
                params: {
                    id: id
                }
            });
            this.loadPosts();
        },

        getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
        },
    }
}
</script>

<template>
    <div class="item-page">
        <div v-if="isReady">
            <div class="item-info">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img :src="'/src/assets/img/avatars/' + item.avatar" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ item.name }} </h5>
                                <pre class="card-text">{{ item.info }}</pre>
                                <p v-if="item.link" class="card-link">Ссылка: {{ item.link }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Стена пользователя -->
            <div class="item-wall">

                <!--
                    Для текущего пользователя
                    показываем создание нового поста
                -->
                <div v-if="isCurrentItem">
                    <form @submit="createPost" class="post-form my-3">
                        <textarea class="form-control" rows="2" placeholder="Что нового?" v-model="postContent"></textarea>
                        <button type="submit" class="btn btn-primary">
                            Отправить
                        </button>
                    </form>
                </div>


                <!-- Посты -->
                <div v-if="posts.length == 0">
                    Здесь пока ничего нет
                </div>
                <div v-else>
                    <div class="item-post card mb-3" v-for="(item, index) in posts">
                        <div class="card-body">
                            <div class="item-post-time">
                                {{ getRelativeDate(item.createdAt) }}
                            </div>
                            <pre v-html="item.content" class="card-text"></pre>
                            <span @click="deletePost(item._id)">X</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <br>
            <h2>
                Не забудте подключить MongoDB!
            </h2>
        </div>
    </div>
</template>


<style>
.item-page img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.item-post {
    display: flex;
}


.item-post span {
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
    text-align: center;
    width: 15px;
    cursor: pointer;
    border: #6c757d 1px solid;
    border-radius: 20%;
}

.item-post span:hover {
    background-color: #6c757d;
}

.item-post span:active {
    background-color: #000;
}

.post-form {
    display: flex;
    gap: 10px;
}

.item-post-time {
    font-size: 14px;
    color: #6c757d;
}

.card-text {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
}
</style>