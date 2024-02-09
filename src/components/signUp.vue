<template>
    <div>
        <div class="flex justify-center items-center h-full w-full">
            <div class="flex flex-col w-[80%] h-[90%] max-w-[1198px] px-10">
                <!-- 회원가입 -->
                <div class="flex flex-col mt-3 mb-6">
                    <div class="text-3xl font-bold mb-6">회원가입</div>
                    <span class="text-[#545454] text-base"> 요만큼은 태그를 사용한 사용자 맞춤 가계부 시스템 입니다</span>
                </div>

                <!-- 입력 폼 -->
                <div class="grid gap-4 inputSpace w-full justify-center items-center ">

                    <!-- 이메일 인증 -->
                    <div class="flex flex-col w-full min-w-[250px]">
                        <div class="flex justify-start items-center">
                            <div class="text-base">이메일 인증</div>
                        </div>
                        <div class="flex justify-center items-center inputStyle">
                            <input type="text" id="user_email" autocomplete="off" v-bind="signUpForm.email"
                                placeholder="Example@email.com"
                                class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md h-full w-full px-4" />
                        </div>
                        <small class="text-red-600" id="email-error">{{ errors.email ||
                            '&nbsp;' }}</small>
                    </div>

                    <!-- 이메일 인증 확인 -->
                    <div class="flex flex-col w-full min-w-[250px] ">
                        <div class="flex justify-between items-center">
                            <div class="text-base">이메일 인증 확인</div>
                            <div v-if="time != null" class="text-red-600"> 남은 시간 : {{ time }}</div>
                        </div>
                        <div class="flex justify-center items-center inputStyle gap-2">
                            <input type="text" id="user_email_cert" autocomplete="off" v-bind="signUpForm.email_cert"
                                placeholder="인증번호 입력"
                                class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md h-full w-[50%] px-4" />
                            <Button class="h-full w-[50%] justify-center bg-[#1e4ae9]" @click="emailCertification"> {{
                                emailButton }}
                            </Button>
                        </div>
                        <small class="text-red-600 " id="email-cert-error">{{ errors.email_cert ||
                            '&nbsp;' }}</small>
                    </div>


                    <!-- 비밀번호 -->
                    <div class="flex flex-col w-full min-w-[250px] ">
                        <div class="flex justify-start items-center">
                            <div class="text-base">비밀번호</div>
                        </div>
                        <div class="flex justify-center items-center inputStyle">
                            <form class="h-full w-full">
                                <input type="password" autocomplete="off" id="user_password" v-bind="signUpForm.password"
                                    placeholder="6~20자의 문자, 숫자, 특수문자 조합"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md h-full w-full  px-4" />
                            </form>
                        </div>
                        <small class="text-red-600" id="password-error">{{ errors.password ||
                            '&nbsp;' }}</small>
                    </div>

                    <!-- 비밀번호 확인 -->
                    <div class="flex flex-col w-full min-w-[250px] ">
                        <div class="flex justify-start items-center">
                            <div class="text-base">비밀번호 확인</div>
                        </div>
                        <div class="flex justify-center items-center inputStyle">
                            <form class="h-full w-full">
                                <input type="password" autocomplete="off" id="user_password_repeat"
                                    v-bind="signUpForm.password_repeat" placeholder="6~20자의 문자, 숫자, 특수문자 조합"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md  h-full w-full px-4" />
                            </form>
                        </div>
                        <small class="text-red-600" id="password-repeat-error">{{ errors.password_repeat ||
                            '&nbsp;' }}</small>
                    </div>
                </div>

                <!-- 전체 약관 -->
                <div class="flex justify-between mt-3">
                    <div class="flex">
                        <Checkbox v-model="checked" :binary="true" class="mr-2" @click="makeAllTrue()" />
                        전체 약관 동의
                    </div>
                    <div class="text-gray-500 underline cursor-pointer" @click="showMore = !showMore">
                        보기
                    </div>
                </div>

                <div v-if="!showMore">
                    <!-- 구분선 -->
                    <Divider align="center" type="solid">
                        <b>&nbsp; or &nbsp;</b>
                    </Divider>

                    <!-- SNS 로그인 버튼 -->
                    <div class="flex justify-center gap-4 my-6 h-[50px]">
                        <button v-for="sns in snsButton" :class="sns.url"
                            class="w-1/3 max-w-[127px] h-full bg-cover bg-center rounded-lg border-2"></button>

                    </div>
                </div>
                <div v-else>
                    <!-- 구분선 -->
                    <Divider align="center" type="solid">
                        <b>&nbsp; or &nbsp;</b>
                    </Divider>
                    <div class="mb-6">
                        <div v-for="val, key in termsOfUse">
                            <div class="flex justify-between mb-2">
                                <div class="flex">
                                    <Checkbox v-model="val.checked" :binary="true" class="mr-2" />
                                    {{ key }}
                                </div>
                                <div class="text-gray-500 underline cursor-pointer" @click="val.showMore = !val.showMore">
                                    보기
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 회원가입 버튼 -->
                <div class="flex justify-center items-center mb-6 ">
                    <button
                        class="ripple bg-[#6F8EFF] text-white rounded-md w-[440px] h-[50px] px-2 hover:bg-slate-200">가입하기</button>
                </div>

                <!-- 회원가입 안내 -->
                <div class="flex justify-center mb-6">
                    <div>
                        회원이신가요? &nbsp;
                    </div>
                    <div>
                        <router-link :to="'/signin'" class="text-blue-600"> 로그인하기 </router-link>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate';

const { values, errors, defineInputBinds } = useForm({
    validationSchema: {
        email: val => (isEmail(val) ? true : '아이디 형식이 아닙니다'),
        email_cert: val => (isEmailCertificated(val) ? true : '이메일 인증이 완료되지 않았습니다'),
        password: val => (isPassword(val) ? true : '비밀번호 형식이 맞지 않습니다'),
        password_repeat: val => (isPasswordRepeated(val) ? true : '비밀번호가 일치하지 않습니다'),
    },
});

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isEmailCertificated(value) {
    return values.email === value;
}

function isPassword(value) {
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/.test(value);
}

function isPasswordRepeated(value) {
    return values.password === value;
}

const signUpForm = ref({
    email: defineInputBinds('email'),
    email_cert: defineInputBinds('email_cert'),
    password: defineInputBinds('password'),
    password_repeat: defineInputBinds('password_repeat'),
})

const time = ref(null)
const emailButton = ref('인증번호 발송')
const timerOn = ref(false)
const clock = ref(null)
const emailCertification = async () => {
    await sendEmail()
    if (timerOn.value) {
        timerOn.value = false;
        clearInterval(clock.value);
        emailButton.value = '인증번호 발송';
        return;
    }
    timer();
}

const sendEmail = async () => {
    try {
        const response = await axios.post('/yomankum/api/v1/email/send', {
            email: values.email,
            mailType: "JOIN"
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

// 타이머 기능
const timer = () => {
    let min = 3;
    let sec = 0;
    time.value = '03:00'
    timerOn.value = true;
    emailButton.value = '인증번호 확인';
    clock.value = setInterval(() => {
        if (sec === 0) {
            if (min === 0) {
                clearInterval(clock.value);
                return;
            }
            min--;
            sec = 59;
        } else {
            sec--;
        }
        time.value = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    }, 1000);
}

const checked = ref(false)
const showMore = ref(false)

const snsButton = ref({
    'google': {
        'url': "bg-[url('@/assets/Google.png')]"
    },
    'kakao': {
        'url': "bg-[url('@/assets/Kakao.png')]"
    },
    'naver': {
        'url': "bg-[url('@/assets/Naver.png')]"
    }
})

const termsOfUse = ref({
    '서비스 이용약관': {
        'checked': false,
        'showMore': false,
        'content': ''
    },
    '개인정보 처리방침': {
        'checked': false,
        'showMore': false,
        'content': ''
    },
    '이벤트 정보 수신': {
        'checked': false,
        'showMore': false,
        'content': ''
    }
})

const makeAllTrue = () => {
    if (!checked.value) {
        for (const key in termsOfUse.value) {
            termsOfUse.value[key].checked = true
        }
    } else {
        for (const key in termsOfUse.value) {
            termsOfUse.value[key].checked = false
        }
    }
}

</script>

<style scoped>
@media (min-width:0px) and (max-width:770px) {

    .inputSpace {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .inputStyle {
        width: 100%;
        height: 40px;
    }

}

@media (min-width:770px) and (max-width:1200px) {
    .inputSpace {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .inputStyle {
        width: 100%;
        height: 50px;
    }

}

@media (min-width:1200px) {

    .inputSpace {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .inputStyle {
        width: 100%;
        height: 50px;
    }
}
</style>