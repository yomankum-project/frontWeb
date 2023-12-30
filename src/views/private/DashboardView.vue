<template>
    <div class="flex flex-col h-full w-full">
        <!-- <div class="flex h-[8%] items-center gap-4"> -->
        <!-- 수입 지출 버튼 -->
        <!-- <Button :class="{ selectedButton: isSelected }"> 수입 </Button> -->
        <!-- <Button :class="{ selectedButton: !isSelected }"> 지출 </Button> -->
        <!-- </div> -->
        <div class="flex justify-between items-center">
            <!-- 태그 검색, 날짜 이동, 새 지출 내역 -->
            <div class="w-1/2 border-b-2">
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-gray-400" />
                    <InputText v-model="searching" placeholder="태그 검색" class="pl-10 w-full border-none" />
                    <i class="pi pi-times-circle absolute top-2/4 -mt-2 right-3 text-gray-400" />
                </span>
            </div>
            <div class="w-1/2 flex justify-end gap-8">
                <div class="flex items-center text-center gap-3">
                    <Button icon="pi pi-angle-left" class="" />
                    <div>
                        <span class=" text-[#16171D] font-medium">
                            {{ changeFormat(currentDate) }}
                        </span>
                        <i class="pi pi-angle-down text-[#6C7593] ml-2" @click="toggleCalendar" />

                        <OverlayPanel ref="op" class="w-[200px]">
                            <Calendar v-model="currentDate" class="" inline dateFormat="dd/mm/yy" />
                            <!-- mm+'월 '+dd+'일,'+yy -->
                        </OverlayPanel>
                    </div>
                    <Button icon=" pi pi-angle-right" class="" />
                </div>
                <div>
                    <Button class="newbutton">
                        <i class="pi pi-plus mr-2" />
                        새 지출 내역
                    </Button>
                </div>
            </div>
        </div>
        <div class="mt-7 h-[90%] w-full">
            <!-- 수입 지출 리스트 테이블 -->
            <div class="h-[8%] flex ">
                <div class="w-1/6 tableRowTitle">날짜</div>
                <div class="w-1/12 tableRowTitle">수입</div>
                <div class="w-1/12 tableRowTitle">지출</div>
                <div class="w-1/4 tableRowTitle">대분류</div>
                <div class="w-1/4 tableRowTitle">상세 내역</div>
                <div class="w-1/4 tableRowTitle">소분류</div>
                <div class="w-[5%] justify-center tableRowTitle"></div>
            </div>
            <div class="h-[80%]">
                <div v-for="data in sliceList()" class="flex w-full" :style="{ 'height': 'calc( 100% /' + row + ')' }">
                    <div class="w-1/6 tableRow text-[#333333]">
                        {{ data.date }}
                    </div>
                    <div class="w-1/12 tableRow">
                        <div class="bg-[rgba(0,186,52,0.1)] text-[#00BA34] tag">
                            + {{ data.income }}
                        </div>
                    </div>
                    <div class="w-1/12 tableRow">
                        <div class="bg-[rgba(255,59,59,0.1)] text-[#FF3B3B] tag">
                            - {{ data.outcome }}
                        </div>
                    </div>
                    <div class="w-1/4 tableRow">
                        <div v-for=" item  in  data.main" class="bg-[rgba(30,74,233,0.1)] text-[#6F8DFE] tag">
                            {{ item
                            }}</div>
                    </div>
                    <div class="w-1/4 tableRow text-gray-500">
                        {{ data.detail }}
                    </div>
                    <div class="w-1/4 tableRow">
                        <div v-for=" item  in  data.sub" class="bg-[rgba(30,74,233,0.1)] text-[#6F8DFE] tag mr-2">{{ item
                        }}
                        </div>
                    </div>
                    <div class="w-[5%] justify-center tableRow">
                        <i class="pi pi-ellipsis-h p-mr-2 border-none" />
                    </div>
                </div>
            </div>
            <Paginator v-model:first="page" :rows="row" :totalRecords="totalRecords" class=" h-[12%]"></Paginator>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'

onMounted(() => {
    // 데이터 가져오기
    for (let i = 0; i < 100; i++) {
        list.value.push({
            date: '12월 26일 : 20시 00분',
            income: '50000' + Number(i),
            outcome: '20000' + Number(i),
            main: ['월급'],
            detail: '휴일이와 외식',
            sub: ['야근 수당', '저녁'],
        })
    }
    slice.value = list.value.slice(0, row.value)
    totalRecords.value = list.value.length
})

const row = ref(10)
const list = ref([])
const totalRecords = ref()

const searching = ref('')

const slice = ref()

const page = ref(0)
// if page is change by paginator, change slice list's range automatically by function
const sliceList = (() => {
    const start = page.value
    const end = start + row.value
    return list.value.slice(start, end)
})

const currentDate = ref(new Date())

const op = ref();

const toggleCalendar = (event) => {
    console.log('hi')
    op.value.toggle(event)
}

const changeFormat = (dateString) => {

    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}월 ${day}일, ${year}`
}

</script>

<style scoped>
Input {
    @apply focus:outline-none focus:outline-offset-0 focus:ring focus:ring-gray-300
}

Button {
    @apply bg-[#F2F7FF] text-[#1E4AE9] border-none hover:bg-[#F2F7FF] hover:text-[#1E4AE9]
}

.selectedButton {
    @apply bg-[#F2F7FF] text-[#1E4AE9]
}

.newbutton {
    @apply bg-[#1E4AE9] text-[#FFFFFF]
}

.tableRow {
    @apply flex items-center border-b-2 px-4
}

.tableRowTitle {
    @apply flex items-center border-b-2 px-4 bg-[#F2F7FF] font-bold
}

.tag {
    @apply font-bold rounded h-[60%] w-[5rem] justify-center items-center flex text-[14px]
}
</style>