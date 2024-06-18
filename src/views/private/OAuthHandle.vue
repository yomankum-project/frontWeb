<template>
    <div>
        <h1>Authenticating...</h1>
    </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia';

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const $axios = inject('$axios');

const userStore = useUserStore();
const { auth } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();


onMounted(() => {
    // 1. 백엔드로 토큰을 던져서 로그인 시도
    // 2. 성공하면 메인 페이지로 이동
    // 3. 실패 (첫 로그인) 이라면, 인증 코드를 사용해 사용자 데이터 요구 (외부 OAuth 서비스) 후 백엔드로 회원가입 요청
    // 4. 회원가입 성공하면 메인 페이지로 이동

    const query = new URLSearchParams(route.query);
    const authCode = query.get('code');

    if (authCode) {
        console.log('Auth code:', authCode);
        tryLogin(authCode);
    }


});

async function tryLogin(authCode) {
    try {

        const body = ref({
            code: authCode,
            type: 'KAKAO',
        })
        const response = await $axios.post('/api/v1/oauth/login', body.value);

        // save accessToken to pinia store
        auth.value.accessToken = response.data.accessToken
        auth.value.id = response.data.id
        // save userInfo to cookie
        cookies.set('refreshToken', response.data.refreshToken, "1d")

        userStore.setUserInfo(response.data.accessToken)
        router.push({ name: 'dashboard' }); // 인증 후 메인 페이지로 이동
    } catch (error) {
        console.error(error);
        trySignUp(authCode);
    }
}

async function trySignUp(authCode) {

    // var accessToken = authCode;

    var body = {
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_KAKAO_JS_KEY,
        redirect_uri: import.meta.env.VITE_FRONTEND_URL + '/oauth2/redirect',
        code: authCode,
    }

    console.log(body);

    const response = await $axios.post('https://kauth.kakao.com/oauth/token', body, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },

    });

    console.log(response);

    window.Kakao.Auth.setAccessToken(response.data.access_token);
    window.Kakao.API.request({
        url: '/v2/user/me',
        data: {
            property_keys: ['profile'],
        },
    })
        .then(function (response) {
            console.log("test", response);
        })
        .catch(function (error) {
            console.log("test2", error);
        });

    // try {
    //     const body = ref({
    //         oauthId: authCode,
    //         authType: 'KAKAO',
    //         email: kakaoProfile.kakao_account.email,
    //     })
    //     const response = await $axios.post('/api/v1/oauth/signup', body.value);

    //     if (response.status == 200) {
    //         tryLogin(authCode);  // 회원가입 성공하면 다시 로그인 시도
    //     }
    // } catch (error) {
    //     console.error(error);
    // }
}
</script>