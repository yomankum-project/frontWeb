<template>
    <div class="flex flex-col justify-center items-center gap-4 overflow-y-auto">
        <!-- 프로필 설정 -->
        <div class="flex flex-col gap-3 w-[60%] h-[338px] shadow-lg p-4 border rounded">
            <div class="flex flex-col  justify-between h-[35%]">
                <div class="flex justify-between h-[30%] w-full font-medium ">
                    <div>
                        프로필 설정
                    </div>
                    <div class="flex justify-end items-center gap-2">
                        <i class="pi pi-ellipsis-h text-[#999DA0] relative">
                        </i>
                    </div>
                </div>
                <div class="h-[70%] flex items-center ">
                    <Avatar class="ml-0 mr-4 bg-[url('@/assets/avatar.jpg')] bg-cover" size="xlarge" shape="circle" />
                </div>
            </div>
            <div class="h-[27.5%] ">
                <div class="h-[45%] font-medium">
                    이름
                </div>
                <InputText class="w-full h-[55%]" placeholder="요만큼" />
            </div>
            <div class="h-[27.5%] ">
                <div class="h-[45%] font-medium">
                    월급 설정
                </div>
                <InputText class="w-full h-[55%]" placeholder="3,000,000" />
            </div>
            <div class="max-h-[15%] justify-end flex">
                <Button class="h-full button">저장 하기</Button>
            </div>
        </div>
        <!-- 계정 설정 -->
        <div class="flex flex-col justify-between gap-3 w-[60%] h-[338px] shadow-lg p-4 border rounded">
            <div class="">
                <div class="h-[20%] font-medium">
                    계정 설정
                </div>
            </div>
            <div class="h-[27.5%] ">
                <div class="h-[45%] font-medium">
                    이메일
                </div>
                <InputText class="w-full h-[55%]" placeholder="yomankum@email.com" />
            </div>
            <div class="h-[27.5%] ">
                <div class="h-[45%] font-medium">
                    비밀번호
                </div>
                <InputText class="w-full h-[55%]" placeholder="password" />
            </div>
            <div class="max-h-[15%] justify-end flex">
                <Button class="h-full button">저장 하기</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.button {
    @apply bg-blue-600 text-[#FFFFFF] text-[16px] font-medium rounded-xl text-center;
}
</style>