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
                            <input type="text" id="user_username" autocomplete="off" v-bind="user.nickname"
                                required="required" placeholder="아이디 입력 (1~15자의 한글/영어 대소문자 사용)"
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
                                <Dropdown v-model="user.gender" :options="genderOption" optionLabel="gender"
                                    placeholder="성별"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4 hover:border-black" />
                            </div>
                        </div>
                        <div class="flex flex-col w-full h-[76px] ">
                            <div class="flex justify-start items-center mb-3">
                                <div class="text-base"> 생년월일 </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <input type="text" id="user_username" autocomplete="off" v-model="user.birth"
                                    required="required" placeholder="1999.09.09"
                                    class="border-2 border-[#D4D7E3] bg-[#F7FBFF] rounded-md w-full h-[50px] px-4" />
                            </div>
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

const emit = defineEmits(['secondLoginCheck'])

const { values, errors, defineInputBinds } = useForm({
    validationSchema: {
        nickname: val => (isNickname(val) ? true : '닉네임 형식이 아닙니다'),
    },
});

// 1~15자의 한글/대소문자 사용 가능
function isNickname(value) {
    return /^[가-힣a-zA-Z]{1,15}$/.test(value);
}

const user = ref({
    'nickname': defineInputBinds('nickname'),
    'gender': '',
    'birth': '',
})

const genderOption = ref([
    { 'gender': '남자' },
    { 'gender': '여자' },
])

const save = () => {
    console.log(user.value)
    emit('secondLoginCheck')
}

</script>
