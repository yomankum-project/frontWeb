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
    // axios.post('/signout')
    //     .then(() => {

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    info.value.checkLogin = 'logout';
    useRouter().push('/');
})

</script>