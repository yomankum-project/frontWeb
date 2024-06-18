<template>
    <div>
        <div class="flex justify-center items-center h-full py-9">
            <div class="flex flex-col w-[90%] h-[90%]">
                <!-- 요만큼 -->
                <div class="flex flex-col mb-6">
                    <div class="text-3xl font-bold mb-6">요만큼</div>
                    <span class="text-[#545454] text-base"> 요만큼은 태그를 사용한 사용자 맞춤 가계부 시스템 입니다</span>
                </div>

                <!-- 아이디와 비밀번호 입력칸 -->
                <div class="flex flex-col mb-6">
                    <div class="flex flex-col mb-6 w-full h-[76px]">
                        <div class="flex justify-start items-center">
                            <div class="text-base">이메일</div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input type="text" id="user_username" autocomplete="off" v-model="email" v-bind="emailAttrs"
                                required="required" placeholder="Example@email.com" aria-describedby="email-error"
                                class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4" />
                        </div>
                        <small class="text-red-600" id="email-error">{{ errors.email ||
                            '&nbsp;' }}</small>
                    </div>
                    <div class="flex flex-col mb-6 w-full h-[76px]">
                        <div class="flex justify-start items-center">
                            <div class="text-base">비밀번호</div>
                        </div>
                        <div class="flex justify-center items-center">
                            <form class="w-full" @submit.prevent="clickSignIn()">
                                <input type="password" autocomplete="off" id="user_password" v-model="password"
                                    v-bind="passwordAttrs" required="required" placeholder="6~20자의 문자, 숫자, 특수문자 조합"
                                    aria-describedby="password-error"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4" />
                            </form>
                        </div>
                        <small class="text-red-600" id="password-error">{{ errors.password ||
                            '&nbsp;' }}</small>
                    </div>
                    <div class="flex justify-between ">
                        <div class="flex">
                            <Checkbox v-model="checked" :binary="true" class="mr-2" />
                            이메일 기억하기
                        </div>
                        <div class="text-gray-500 underline cursor-pointer">
                            이메일/비밀번호 찾기
                        </div>
                    </div>
                </div>

                <!-- 구분선 -->
                <Divider align="center" type="solid">
                    <b>&nbsp; or &nbsp;</b>
                </Divider>

                <!-- SNS 로그인 버튼 -->
                <div class="flex justify-between my-6">
                    <button
                        class="bg-[url('@/assets/Google.png')] w-[30%] h-[50px] bg-no-repeat bg-center bg-cover rounded-lg border-2"></button>
                    <button @click="kakaoLogin()"
                        class="bg-[url('@/assets/Kakao.png')] w-[30%] h-[50px] bg-no-repeat bg-center bg-cover rounded-lg border-2"></button>
                    <button
                        class="bg-[url('@/assets/Naver.png')] w-[30%] h-[50px] bg-no-repeat bg-center bg-cover rounded-lg border-2"></button>
                </div>

                <!-- 로그인 버튼 -->
                <div class="flex justify-center items-center mb-6">
                    <Button @click="clickSignIn()"
                        class="ripple bg-[#1E4AE9] text-white rounded-md w-full h-[50px] px-2 hover:bg-slate-200 justify-center">로그인</Button>
                </div>

                <!-- 회원가입 안내 -->
                <div class="flex justify-center">
                    <div>
                        회원이 아니신가요? &nbsp;
                    </div>
                    <div>
                        <router-link :to="'/signup'" class="text-blue-600"> 가입하기 </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useForm } from 'vee-validate';

import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia';

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

// import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_ENDPOINT;

const $axios = inject('$axios');
const userStore = useUserStore();
const { info, auth } = storeToRefs(userStore);

const router = useRouter();

const emit = defineEmits(['firstLoginCheck'])

onMounted(() => {
    // 로컬 저장소에 저장된 이메일이 있다면 values에 저장
    const autoLogin = localStorage.getItem('autoLogin');
    if (autoLogin != '' && autoLogin != null) {
        email.value = autoLogin;
        checked.value = true
    } else {
        console.log("no email remembered");
    }
})

// 로그인 유지 체크 박스
const checked = ref(false)

// 이메일, 비밀번호 양식 검사 
const { values, errors, defineField } = useForm({
    validationSchema: {
        email: val => (isEmail(val) ? true : '아이디 형식이 아닙니다'),
        password: val => (isPassword(val) ? true : '비밀번호 형식이 맞지 않습니다'),
    },
});

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPassword(value) {
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/.test(value);
}

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const clickSignIn = async () => {

    // console.log(values.email, values.password, errors.value.email, errors.value.password, info.value.checkLogin)

    if (values.email == '' || values.password == '' || values.email == undefined || values.password == undefined) {
        alert('아이디와 비밀번호를 입력해주세요')
        return
    }
    if ((errors.value.email != '' && errors.value.email != undefined) || (errors.value.password != '' && errors.value.password != undefined)) {
        alert('아이디와 비밀번호를 확인해주세요')
        return
    }
    if (info.value.checkLogin == 'login') {
        alert('이미 로그인 되어있습니다')
        return
    }
    await signIn()
}


// 로그인 버튼 클릭시 작동
const signIn = (async () => {
    try {
        const userInfo = {
            email: '',
            password: ''
        }

        userInfo.email = values.email
        userInfo.password = values.password

        const response = await $axios.post('/api/v1/login', userInfo)
        // console.log(response.data.nickname)

        // save accessToken to pinia store
        auth.value.accessToken = response.data.accessToken
        auth.value.id = response.data.id
        // save userInfo to cookie
        cookies.set('refreshToken', response.data.refreshToken, "1d")

        // 로그인 유지 체크 박스가 체크되어 있다면 로컬 저장소에 이메일 저장
        if (checked.value == true) {
            // console.log("save cookie")
            localStorage.setItem("autoLogin", userInfo.email);
        } else {
            // console.log("remove cookie")
            localStorage.removeItem("autoLogin");
        }

        if (response.data.nickname == null || response.data.nickname == '') {
            emit('firstLoginCheck')
            return
        } else {
            console.log('go to main page')
            // 로그인이 성공했다면, pinia store에 사용자 로그인 상태 저장
            info.value.checkLogin = 'login'

            // accessToken decode 후 사용자 정보 저장
            userStore.setUserInfo(response.data.accessToken)
            router.push({ name: 'dashboard' });
            return
        }
    } catch (error) {
        alert('로그인 실패')
        console.log(error)
        return
    }
})

const kakao_redirect_uri = import.meta.env.VITE_FRONTEND_URL + "/oauth2/redirect";

// 1. 인가 코드 얻기
// https://developers.kakao.com/docs/latest/ko/kakaologin/js#login
const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
        redirectUri: kakao_redirect_uri,
        scope: 'profile_nickname',
    });
}

</script>