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
                            <input type="text" id="user_email" autocomplete="off" v-model="email" v-bind="emailAttrs"
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
                            <input type="text" id="user_email_cert" autocomplete="nope" v-model="email_cert"
                                v-bind="emailCertAttrs" placeholder="인증번호 입력"
                                class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md h-full w-[50%] px-4" />
                            <Button v-if="emailButton != '인증 완료'" class="h-full w-[50%] justify-center bg-[#1e4ae9]"
                                @click="emailCertification"> {{
                                emailButton }}
                            </Button>
                            <Button v-else disabled class="h-full w-[50%] justify-center bg-[#1e4ae9]"
                                @click="emailCertification"> {{
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
                                <input type="password" autocomplete="off" id="user_password" v-model="password"
                                    v-bind="passwordAttrs" placeholder="6~20자의 문자, 숫자, 특수문자 조합"
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
                                    v-model="password_repeat" v-bind="passwordRepeatAttrs"
                                    placeholder="6~20자의 문자, 숫자, 특수문자 조합"
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
                                <div class="text-gray-500 underline cursor-pointer"
                                    @click="val.showMore = !val.showMore">
                                    보기
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 회원가입 버튼 -->
                <div class="flex justify-center items-center mb-6 ">
                    <Button
                        class="justify-center bg-[#1e4ae9] text-white rounded-md w-[440px] h-[50px] px-2 hover:bg-[#6F8EFF]"
                        @click="signUpRequest()">가입하기</Button>
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
import { ref, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate';

const $axios = inject('$axios');

const { values, errors, defineField } = useForm({
    validationSchema: {
        email: val => (isEmail(val) ? true : '이메일 형식이 아닙니다'),
        // email_cert: val => (isEmailCertificated(val) ? true : '이메일 인증이 완료되지 않았습니다'),
        password: val => (isPassword(val) ? true : '비밀번호 형식이 맞지 않습니다'),
        password_repeat: val => (isPasswordRepeated(val) ? true : '비밀번호가 일치하지 않습니다'),
    },
});

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// function isEmailCertificated(value) {
//     return values.email === value;
// }

function isPassword(value) {
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/.test(value);
}

function isPasswordRepeated(value) {
    return values.password === value;
}

// const signUpForm = ref({
//     email: defineInputBinds('email'),
//     email_cert: defineInputBinds('email_cert'),
//     password: defineInputBinds('password'),
//     password_repeat: defineInputBinds('password_repeat'),
// })

const [email, emailAttrs] = defineField('email');
const [email_cert, emailCertAttrs] = defineField('email_cert');
const [password, passwordAttrs] = defineField('password');
const [password_repeat, passwordRepeatAttrs] = defineField('password_repeat');

const time = ref(null)
const emailButton = ref('인증번호 발송')
const timerOn = ref(false)
const clock = ref(null)
const emailCertification = async () => {
    console.log(emailButton.value)
    if (emailButton.value == '인증번호 확인') {
        if (values.email_cert == undefined || values.email_cert == '') {
            alert('인증번호를 입력해주세요')
            return;
        }
        var err = await checkEmailCert(values.email_cert)
        if (err != null) {
            alert('인증번호가 일치하지 않습니다')
            return;
        }
        alert('인증이 완료되었습니다')
        clearInterval(clock.value);
        time.value = null;
        timerOn.value = false;
        emailButton.value = '인증 완료'
    } else if (emailButton.value == '인증번호 발송') {
        await sendEmailCert()
    } else {
        alert('이미 인증이 완료되었습니다')
    }
}

const checkEmailCert = async (code) => {
    try {
        const response = await $axios.get(`/api/v1/sign-up/check/code/${values.email}/${code}`)
        console.log(response)
        return null;
    } catch (error) {
        console.log(error)
        return true;
    }
}

const sendEmailCert = async () => {
    if (values.email === undefined || values.email === '') {
        alert('이메일을 입력해주세요')
        return;
    }
    if (!isEmail(values.email)) {
        alert('이메일 형식이 맞지 않습니다')
        return;
    }
    var err = await sendEmail()
    if (err) {
        alert('이메일 발송에 실패하였습니다')
        return;
    }
    timer();
}

const sendEmail = async () => {
    try {
        const response = await $axios.post(`/api/v1/sign-up/send/mail/${values.email}`, {})
        console.log(response)
        return false;
    } catch (error) {
        console.log(error)
        return true;
    }
}

// 타이머 기능
const timer = () => {
    let min = 5;
    let sec = 0;
    time.value = '05:00'
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
        if (min === 0 && sec === 0) {
            clearInterval(clock.value);
            timerOn.value = false;
            emailButton.value = '인증번호 발송';
        }
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

const signUpRequest = async () => {
    if (!checked.value) {
        alert('약관에 동의 해주세요')
        return;
    }
    for (const key in termsOfUse.value) {
        if (!termsOfUse.value[key].checked) {
            alert('약관에 모두 동의 해주세요')
            return;
        }
    }

    console.log(values.value)

    if (values.email == undefined || errors.value.email != undefined || values.email_cert == undefined || errors.value.email_cert != undefined || values.password == undefined || errors.value.password != undefined || values.password_repeat == undefined || errors.value.password_repeat != undefined) {

        console.log(values.email)
        console.log(errors.value.email)

        if (values.email === undefined) {
            alert('이메일을 입력해주세요')
            return;
        }
        if (errors.value.email != undefined) {
            alert(errors.value.email)
            return;
        }
        if (emailButton.value != '인증 완료') {
            alert('이메일 인증을 완료해주세요')
            return;
        }
        if (values.password == undefined) {
            alert('비밀번호를 입력해주세요')
            return;
        }
        if (errors.value.email != undefined) {
            alert('비밀번호 형식이 맞지 않습니다')
            return;
        }
        if (values.password_repeat == undefined) {
            alert('비밀번호 확인을 입력해주세요')
            return;
        }
        if (errors.value.password_repeat != undefined) {
            alert('비밀번호가 일치하지 않습니다')
            return;
        }
        return;
    }

    await signUp()
}

const signUp = async () => {
    try {
        console.log(values.email, values.password)
        const response = await $axios.post('/api/v1/sign-up', {
            email: values.email,
            password: values.password
        })
        console.log(response)
        alert('회원가입이 완료되었습니다')
    } catch (error) {
        console.log(error)
        alert('회원가입에 실패하였습니다')
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