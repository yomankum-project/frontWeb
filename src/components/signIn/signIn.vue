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
                            <input type="text" id="user_username" autocomplete="off" v-bind="user.email" required="required"
                                placeholder="Example@email.com" aria-describedby="email-error"
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
                            <form class="w-full">
                                <input type="password" autocomplete="off" id="user_password" v-bind="user.password"
                                    required="required" placeholder="6~20자의 문자, 숫자, 특수문자 조합"
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
                    <button
                        class="bg-[url('@/assets/Kakao.png')] w-[30%] h-[50px] bg-no-repeat bg-center bg-cover rounded-lg border-2"></button>
                    <button
                        class="bg-[url('@/assets/Naver.png')] w-[30%] h-[50px] bg-no-repeat bg-center bg-cover rounded-lg border-2"></button>
                </div>

                <!-- 로그인 버튼 -->
                <div class="flex justify-center items-center mb-6">
                    <button @click="signIn"
                        class="ripple bg-[#1E4AE9] text-white rounded-md w-full h-[50px] px-2 hover:bg-slate-200">로그인</button>
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
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate';

const emit = defineEmits(['firstLoginCheck'])

onMounted(() => {
    // 로컬 저장소에 저장된 이메일이 있다면 values에 저장
    const autoLogin = localStorage.getItem('autoLogin');
    if (autoLogin) {
        values.email = autoLogin;
        checked.value = ['true']
    } else {
        console.log("no email remembered");
    }
})

// 로그인 유지 체크 박스
const checked = ref(false)

// 이메일, 비밀번호 양식 검사 
const { values, errors, defineInputBinds } = useForm({
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

const user = ref({
    email: defineInputBinds('email'),
    password: defineInputBinds('password'),
})

// 로그인 버튼 클릭시 작동
const signIn = async () => {
    try {
        const userInfo = values
        console.log(userInfo)
        // const response = await axios.post('http://localhost:8000/signUp', user.value)
        // console.log(response)

        // 로그인이 성공했다면, pinia store에 사용자 로그인 상태 저장
        // ...

        // 로그인 유지 체크 박스가 체크되어 있다면 로컬 저장소에 이메일 저장
        if (checked.value == 'true') {
            localStorage.setItem("autoLogin", userInfo.email);
        } else {
            localStorage.removeItem("autoLogin");
        }

        // 로그인이 성공했다면, 메인 페이지로 이동
        // 첫 로그인이라면 firstLoginCheck 이벤트 발생
        emit('firstLoginCheck')

    } catch (error) {
        console.log(error)
    }
}

</script>