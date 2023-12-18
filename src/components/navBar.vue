<template>
    <div>
        <div class="flex h-full w-full justify-between items-center">
            <!-- 로고 영역 -->
            <div class="text-[blue] text-3xl font-extrabold ml-[5%]">
                <router-link :to="'/'" class="mx-3"> 요만큼 </router-link>
            </div>
            <!-- 메인 메뉴 -->
            <!-- <div class="flex">
                <div v-for="menu in mainMenu">
                    <router-link :to="menu.path" class="mx-3"> {{ menu.name }} </router-link>
                </div>
            </div> -->
            <!-- 유저 메뉴 -->
            <div v-if="isRequirePath()" class="flex mr-[5%]">
                <div v-for="menu in userMenu" class="flex justify-center items-center">
                    <router-link :to="menu.path" class="mx-3 flex justify-center items-center">
                        <div :class="menu.class" class="flex justify-center items-center">
                            {{ menu.name }}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'

import { ref } from 'vue'
const route = useRoute()

// const mainMenu = ref([
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
// ])

const isRequirePath = () => {
    if (route.path === '/signin' || route.path === '/signup') {
        return false
    } else {
        return true
    }
}

const userMenu = ref([
    {
        name: '회원가입',
        path: '/signup',
        class: 'w-[127x] h-[50px]'
    },
    {
        name: '로그인',
        path: '/signin',
        class: 'w-[127px] h-[50px] button rounded-lg bg-[blue] text-white'
    },
])
</script>

<style scoped>
.navButton {
    color: #000000;
    text-decoration: none;
}
</style>
