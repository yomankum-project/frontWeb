<template>
    <div>
        <div class="flex justify-center items-center h-full py-9">
            <div class="flex flex-col justify-center items-center w-[90%] h-[90%]">
                <!-- 제목 -->
                <div class="flex flex-col mb-6 w-full">
                    <div class="text-3xl font-bold mb-6">나만의 태그를 설정해보세요.</div>
                    <span class="text-[#545454] text-base mb-6">
                        많이 사용하는 대분류 태그 5개를 모아봤어요.
                        <br />
                        태그는 마이페이지에서 더 추가하실 수 있습니다.
                    </span>
                </div>

                <div class="grid grid-cols-4 gap-4 w-full">
                    <Button v-for="tag in tags" class="justify-center border-[#1e4ae9] bg-[#1e4ae9]">
                        {{ tag.name }}
                    </Button>
                    <Button class="justify-center " :pt="{
                        root: { class: 'border-[#1e4ae9] text-blue-600 border-2 rounded-md' }
                    }"> + 태그 추가
                    </Button>
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

const save = () => {
    console.log('hi3')
}

const tags = ref([
    { name: '적금', color: '#FFD600' },
    { name: '교통비', color: '#FF6D00' },
    { name: '식비', color: '#FF1744' },
    { name: '생활비', color: '#651FFF' },
    { name: '공과금', color: '#00B0FF' },
])

</script>