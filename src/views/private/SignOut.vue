<template></template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router';

const userStore = useUserStore();
const { info } = storeToRefs(userStore);

axios.defaults.baseURL = import.meta.env.VITE_ENDPOINT;

onMounted(() => {
    // 세션 스토리지 초기화
    sessionStorage.clear();

    info.value.checkLogin = 'logout';
    useRouter().push('/');
})

</script>