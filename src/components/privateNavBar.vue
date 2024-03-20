<template>
    <div class="pt-2 px-4">

        <div class="flex justify-between h-[40%] items-center">
            <div class="flex justify-start items-center mx-4 w-[20%]">
                <!-- 아바타 -->
                <Avatar class="ml-0 mr-4 bg-[url('@/assets/avatar.jpg')] bg-cover" size="large" shape="circle" />
                <!-- 이름 -->
                <span class="text-[#2D2E2F]"> 요만큼 씨</span>
            </div>
            <div class="mx-4 flex">
                <!--  알람 아이콘 -->
                <i class="pi pi-bell text-[#999DA0] relative hover:text-blue-600" style="font-size: 1.5rem">
                    <div value="" class="absolute w-2 h-2 rounded-full bg-red-500 block top-0 right-0"></div>
                </i>

                <div class="ml-4 relative">
                    <!-- 메뉴바 아이콘 -->
                    <i class="menuboxbutton pi pi-bars text-[#999DA0] hover:text-blue-600" style="font-size: 1.5rem"
                        @click="menu" />
                    <!-- 메뉴바 클릭시 -->
                    <transition name="fade">
                        <div class="menubox w-[200px] rounded-lg border-2 absolute top-10 right-0 z-20 bg-white"
                            :class="{ hidden: !showMenu }">
                            <div class="flex flex-col">
                                <div
                                    class="flex justify-center items-center h-[50px] text-[#2D2E2F] hover:bg-[#E8EDFD] hover:text-blue-600 border-b-2">
                                    마이페이지
                                </div>
                                <router-link to="/signout"
                                    class="flex justify-center items-center h-[50px] text-[#2D2E2F] hover:bg-[#E8EDFD] hover:text-blue-600">
                                    로그아웃
                                </router-link>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <div class="flex h-[60%] items-center mx-4 text-[#6D7073] text-[12px]">
            <!-- 날짜 -->
            <span class="mr-4 border-r-2 pr-4"> 2023. 11. 18, 수요일 </span>

            <!-- 시간 -->
            <span class="mr-4 border-r-2 pr-4"> 5 : 10 AM </span>

            <!-- 온도 -->
            <span class=""> 30,000,000 원 </span>

        </div>

    </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue'

const showMenu = ref(false)
const menu = () => {
    showMenu.value = !showMenu.value
}

const closeMenu = () => {
    showMenu.value = false;
};

let clickOutsideEvent;

onMounted(() => {
    clickOutsideEvent = event => {

        const skipEl = document.querySelector('.menuboxbutton');
        if (skipEl.contains(event.target)) return;

        const el = document.querySelector('.menubox');
        if (!el.classList.contains('hidden') && !(el.contains(event.target) || event.target === el)) {
            closeMenu();
        }
    };
    document.body.addEventListener('click', clickOutsideEvent);
});

onUnmounted(() => {
    document.body.removeEventListener('click', clickOutsideEvent);
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>