<template>
    <div class="flex flex-col">
        <div class="basis-[12%] flex justify-center items-center">
            <div class="logo">
                요만큼
            </div>
        </div>
        <div>
            <router-link :to="menu.path" v-for="menu in mainMenu"
                class="flex h-[60px]  justify-start items-center pl-8 text-[#86878F]"
                :class="{ 'border-blue-700 font-bold border-l-[5px]': menu.selected }" @click="clickSideMenu(menu)"> {{
                    menu.name }} </router-link>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const mainMenu = ref([
    { name: '가계부', path: '/', selected: true },
    { name: '나의 지출입 달력', path: '/calendar', selected: false },
    { name: '나의 소비 분석', path: '/statistic', selected: false },
    { name: '마이페이지', path: '/profile', selected: false },
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
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 900;
    font-size: 30px;
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