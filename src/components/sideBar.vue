<template>
    <div class="flex flex-col">
        <div class="basis-[100px] flex justify-center items-center">
            <router-link :to="'/'" class="logo" @click="clickSideMenu(mainMenu[0])">
                요만큼
            </router-link>
        </div>
        <div v-for="menu in mainMenu">
            <router-link :to="menu.path" v-if="menu.role == undefined || menu.role == checkRole()"
                class="flex h-[60px]  justify-start items-center pl-8 text-[#86878F]"
                :class="{ 'border-blue-700 font-bold border-l-[5px]': menu.selected }" @click="clickSideMenu(menu)"> {{
                    menu.name }} </router-link>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user'

const user = useUserStore();
const { auth } = storeToRefs(user);

const checkRole = () => {
    if (auth == undefined) return ''
    return user.returnRole(auth.value.accessToken)
}

const mainMenu = ref([
    { name: '가계부', path: '/', selected: true },
    { name: '나의 지출입 달력', path: '/calendar', selected: false },
    { name: '나의 소비 분석', path: '/statistic', selected: false },
    { name: '마이페이지', path: '/profile', selected: false },
    { name: '관리자페이지', path: '/admin', selected: false, role: 'ADMIN' },
])

const clickSideMenu = (menu) => {
    mainMenu.value.forEach((item) => {
        item.selected = false
    })
    menu.selected = true
}

</script>

<style scoped>
.logo {

    /* Logo */
    font-style: bold;
    font-weight: 900;
    font-size: 46px;
    line-height: 36px;
    /* identical to box height */

    color: #1E4AE9;

    text-shadow: 0px 2px 8px rgba(62, 62, 62, 0.25);

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
</style>