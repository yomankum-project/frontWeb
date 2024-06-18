<template>
    <div class="flex h-full">
        <!-- 달력 영역 -->
        <div class="flex flex-col w-2/3 border-r-2 pr-5">
            <!-- 년도, 월 -->
            <div class="text-[#585757] text-[16.8px] font-bold mb-4">
                {{ formatDate(date) }}
            </div>
            <!-- 달력 내용 -->
            <div class="flex flex-col flex-1 ">
                <div class="flex items-center w-full  h-10">
                    <div v-for="top in calendarTop"
                        class="text-[#969696] text-[11.2px] font-medium p-1 border w-[14.285714285%] h-full flex items-center">
                        {{ top }}
                    </div>
                </div>
                <div v-for="week in calendar" class="flex flex-1 items-center w-full ">
                    <div v-for="i in Array(7).keys()" :key="i"
                        class="flex flex-col p-2 w-[14.285714285%] h-full border justify-between">
                        <div>
                            {{ week[i] }}
                        </div>
                        <div v-if="tagForDate[week[i]] != null" class="flex flex-wrap">
                            <div v-if="tagForDate[week[i]][0] != '' && tagForDate[week[i]][0] != null"
                                class="bg-[#00BA34] text-[#FFFFFF] text-[10px] font-medium p-1 rounded m-1  text-center">
                                {{ tagForDate[week[i]][0] }}
                            </div>
                            <div v-if="tagForDate[week[i]][1] != '' && tagForDate[week[i]][1] != null"
                                class="bg-[#E92C2C] text-[#FFFFFF] text-[10px] font-medium p-1 rounded m-1 text-center">
                                {{ tagForDate[week[i]][1] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 상세 내역 -->
        <div class="flex flex-col w-1/3 px-5 h-full">
            <div class="flex justify-between items-center">
                <div class="text-[#2D2E2F] text-[32px] font-medium">
                    {{ formatDate2(date) }} 상세 내역
                </div>
                <i class="pi pi-times p-mr-2 border-none text-[24px] text-gray-400" />
            </div>
            <div class="flex flex-col flex-1 border-2 mt-5 rounded overflow-y-auto">
                <div v-for="card in detailCards " class="p-3 rounded shadow-xl shadow-gray-200/50 m-3">
                    <div class="border-b-2 text-[20px] font-medium p-5" :class="checkLevel(card.level)">
                        <i class="pi pi-check-circle mr-2" />
                        {{ card.title }}
                    </div>
                    <div class="m-3 p-5">
                        {{ card.detail }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
    // console.log('mounted')
    calendar.value = createCalendar()
})

const calendar = ref()
const date = ref(new Date())

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}, ${month}월`
}

const formatDate2 = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}년 ${month}월`
}

const checkLevel = (level) => {
    if (level === 'good') {
        return 'text-[#84C03F]'
    } else if (level === 'bad') {
        return 'text-[#E92C2C]'
    } else {
        return 'text-[#6F8DFE]'
    }
}

const detailCards = ref([
    { title: '이번달은 식비 비용을 더 사용했어요.', detail: '저번달 보다 식비에 300,000원 더 사용하였어요', level: 'bad' },
    { title: '이번달은 교통 비용을 아꼈어요.', detail: '저번달 보다 교통비에 19,200원 덜 사용하였어요', level: 'good' },
    { title: '이번달은 쇼핑 비용을 비슷하게 사용했어요.', detail: '저번달 보다 쇼핑에 2,000원 더 사용하였어요', level: 'normal' },
    { title: '이번달은 식비 비용을 더 사용했어요.', detail: '저번달 보다 식비에 300,000원 더 사용하였어요', level: 'bad' },
    { title: '이번달은 교통 비용을 아꼈어요.', detail: '저번달 보다 교통비에 19,200원 덜 사용하였어요', level: 'good' },
    { title: '이번달은 쇼핑 비용을 비슷하게 사용했어요.', detail: '저번달 보다 쇼핑에 2,000원 더 사용하였어요', level: 'normal' },
    { title: '이번달은 식비 비용을 더 사용했어요.', detail: '저번달 보다 식비에 300,000원 더 사용하였어요', level: 'bad' },
    { title: '이번달은 교통 비용을 아꼈어요.', detail: '저번달 보다 교통비에 19,200원 덜 사용하였어요', level: 'good' },
    { title: '이번달은 쇼핑 비용을 비슷하게 사용했어요.', detail: '저번달 보다 쇼핑에 2,000원 더 사용하였어요', level: 'normal' },
])

const calendarTop = ref([
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',
])

const createCalendar = () => {
    const firstDay = new Date(date.value.getFullYear(), date.value.getMonth(), 1)
    const lastDay = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const lastDayOfWeek = lastDay.getDay()
    const lastDate = lastDay.getDate()
    const output = []
    let week = []
    for (let i = 0; i < firstDayOfWeek; i++) {
        week.push('')
    }
    for (let i = 1; i <= lastDate; i++) {
        week.push(i)
        if (week.length === 7) {
            output.push(week)
            week = []
        }
    }
    for (let i = lastDayOfWeek; i < 6; i++) {
        week.push('')
    }
    output.push(week)
    console.log(output)
    return output
}

const tagForDate = ref({
    1: ['+1,200', ''],
    12: ['+7,200', '-2,000'],
    23: ['+10,000', '-200,000'],
    14: ['+1,002,000', '-20,000'],
})
</script>