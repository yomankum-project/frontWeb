<template>
    <div>
        <div class="flex justify-center items-center h-full py-9">
            <div class="flex flex-col justify-center items-center w-[90%] h-[90%]">
                <!-- 제목 -->
                <div class="flex flex-col mb-6 w-full">
                    <div class="text-3xl font-bold mb-6">더 스마트하게 가계부 이용하기</div>
                    <span class="text-[#545454] text-base mb-6"> 가계부를 더 효율적으로 사용하기 위한 데이터가 필요해요 </span>
                </div>

                <div class="flex flex-col mb-6 w-full">

                    <!-- 닉네임 입력 -->
                    <div class="flex flex-col mb-6 w-full h-[76px]">
                        <div class="flex justify-start items-center mb-3">
                            <div class="text-base">닉네임 입력</div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input type="text" id="user_username" autocomplete="off" v-model="nickname"
                                v-bind="nicknameAttrs" required="required" placeholder="아이디 입력 (1~15자의 한글/영어 대소문자 사용)"
                                aria-describedby="nickname-error"
                                class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4" />
                        </div>
                        <small class="text-red-600" id="nickname-error">{{ errors.nickname ||
                                '&nbsp;' }}</small>
                    </div>

                    <!-- 성별 생년월일 입력 -->
                    <div class="grid grid-cols-2 gap-1">
                        <div class="flex flex-col w-full h-[76px] ">
                            <div class="flex justify-start items-center mb-3">
                                <div class="text-base"> 성별 </div>
                            </div>
                            <div class="flex justify-start items-center">
                                <Dropdown v-model="gender" :options="genderOption" optionLabel="gender" placeholder="성별"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4 hover:border-black" />
                            </div>
                        </div>
                        <div class="flex flex-col w-full h-[76px] ">
                            <div class="flex justify-start items-center mb-3">
                                <div class="text-base"> 생년월일 </div>
                            </div>
                            <div class="flex justify-between items-center relative">
                                <input type="text" id="user_birth" autocomplete="off" v-model="birth"
                                    v-bind="birthAttrs" required="required" placeholder="yyyy-mm-dd"
                                    aria-describedby="birth-error"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4" />
                            </div>
                            <small class="text-red-600" id="birth-error">{{ errors.birth ||
                                '&nbsp;' }}</small>
                        </div>

                    </div>

                </div>

                <!-- 구분선 -->
                <Divider align="center" type="solid">
                    <!-- <b>&nbsp; or &nbsp;</b> -->
                </Divider>

                <!-- 저장버튼 -->
                <Button class="justify-center w-full mt-5 bg-[#1e4ae9] border-[#1e4ae9]" @click="save()"> 저장 </Button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore();

const emit = defineEmits(['secondLoginCheck'])

const { values, errors, defineField } = useForm({
    validationSchema: {
        nickname: val => (isNickname(val) ? true : '닉네임 형식이 아닙니다'),
        birth: val => (isDate(val) ? true : '유효한 날짜 형식이 아닙니다'),
    },
});

// 1~15자의 한글/대소문자 사용 가능
function isNickname(value) {
    return /^[가-힣a-zA-Z]{1,15}$/.test(value);
}

// yyyy-mm-dd 형태의 날짜
function isDate(value) {

    if (value != '' && value != undefined) {
        const today = new Date()
        var check1 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)
        var check2 = value.split('-')[0] > 1900 && value.split('-')[0] < today.getFullYear()
        var check3 = value.split('-')[1] > 0 && value.split('-')[1] < 13
        var check4 = value.split('-')[2] > 0 && value.split('-')[2] < 32

        return check1 && check2 && check3 && check4;
    }

    return false
}

const gender = ref('')

const user = ref({
    'nickname': '',
    'gender': '',
    'birthDate': '',
})

// const showCalender = ref(true)

const [nickname, nicknameAttrs] = defineField('nickname')
const [birth, birthAttrs] = defineField('birth')

const genderOption = ref([
    { 'gender': '남자' },
    { 'gender': '여자' },
])

const save = async () => {

    // console.log(values.nickname, user.value.gender)

    if (errors.value.nickname != undefined || values.nickname == '' || values.nickname == undefined) {
        alert('닉네임을 확인해주세요')
        return
    }

    if (gender.value.gender == '' || gender.value.gender == undefined) {
        alert('성별을 확인해주세요')
        return
    }

    if (errors.value.birth != undefined || values.birth == '' || values.birth == undefined) {
        alert('생년월일을 확인해주세요')
        return
    }

    // saveRequest()
    await saveRequest()

    // emit('secondLoginCheck')
}

const saveRequest = async () => {

    const body = ref({
        "nickname": values.nickname,
        "gender": '',
        "birthDate": values.birth,
    })

    // console.log(gender.value.gender)

    if (gender.value.gender == '남자') {
        // console.log('남자')
        body.value.gender = 'MALE'
    } else if (gender.value.gender == '여자') {
        // console.log('여자')
        body.value.gender = 'FEMALE'
    }

    // console.log(body)

    try {
        const response = await userStore.axiosAuthInterceptors().post('/yomankum/api/v1/login/first', body.value)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

</script>


<style scoped></style>