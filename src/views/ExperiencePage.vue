<script>
import axios from 'axios';

export default {
    data() {
        return {
            experience: []
        }
    },
    mounted() {
        this.loadExperience();
    },
    methods: {
        async loadExperience() {
            let response = await axios('/items');
            this.experience = response.data;
        },
        goItem(itemName) {
            this.$router.push({
                name: 'items',
                params: { item: itemName }
            });
        }
    }
}
</script>


<template>
    <div class="experience-page">
        <h3>Мой опыт</h3>

        <ul class="list-group my-3">
            <li v-for="(item, index) in experience" class="list-group-item friend my-2" @click="goItem(item.itemName)">
                <img :src="'src/assets/img/avatars/' + item.avatar">
                <div class="username">
                    {{ item.name }}
                </div>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.experience-page img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #6c757d;
}

.experience-page .friend {
    cursor: pointer;
    height: 100px;

    display: flex;
    gap: 20px;
    align-items: center;
}

.experience-page .itemName {
    font-weight: bold;
}
</style>