<template>
    <div class="flex justify-center items-center w-full">
        <div class="flex flex-wrap justify-center items-center w-full">
            <div class="bg-[#F2F7FF] bg_card flex justify-center items-center">
                <img v-if="!firstLoginCheck && !secondLoginCheck" src="@/assets/img/origin/Budget.png" alt="signin_bg"
                    class=" w-[80%] h-[60%] max-w-[500px] min-w-[330px]">
                <img v-else-if="firstLoginCheck && !secondLoginCheck" src="@/assets/img/origin/Data.png" alt="signin_bg"
                    class=" w-[80%] h-[60%] max-w-[500px] min-w-[330px]">
                <img v-else src="@/assets/img/origin/Tag.png" alt="signin_bg"
                    class=" w-[80%] h-[60%] max-w-[500px] min-w-[330px]">
            </div>
            <signin v-if="!firstLoginCheck && !secondLoginCheck" class="card shadow-xl mb-6"
                @first-login-check="firstEvent()"></signin>
            <firstLogin v-else-if="firstLoginCheck && !secondLoginCheck" class="card shadow-xl mb-6"
                @second-login-check="secondEvent()"></firstLogin>
            <secondLogin v-else class="card shadow-xl mb-6"></secondLogin>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import signin from '@/components/signIn/signIn.vue'
import firstLogin from '@/components/signIn/firstLogin.vue'
import secondLogin from '@/components/signIn/secondLogin.vue'

onMounted(() => {
})

const firstLoginCheck = ref(false)
const secondLoginCheck = ref(false)

const firstEvent = () => {
    firstLoginCheck.value = true
    alert('첫 로그인 입니다. 추가 정보를 입력 해주세요')
}

const secondEvent = () => {
    console.log('hi2')
    alert('hi2')
    secondLoginCheck.value = true
}

</script>