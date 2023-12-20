<template>
    <div class="pt-2 px-4">

        <div class="flex justify-between h-[40%] items-center">
            <div class="flex justify-start items-center mx-4 w-[20%]">
                <!-- 아바타 -->
                <Avatar class="ml-0 mr-4 bg-[url('@/assets/avatar.jpg')] bg-cover" size="large" shape="circle" />
                <!-- 이름 -->
                <span class="text-[#2D2E2F]"> 요만큼 씨</span>
            </div>
            <!--  알람 아이콘 -->
            <div class="mx-4">
                <i class="pi pi-bell text-[#999DA0] relative" style="font-size: 1.5rem">
                    <div value="" class="absolute w-2 h-2 rounded-full bg-red-500 block top-0 right-0"></div>
                </i>
            </div>
        </div>

        <div class="flex h-[60%] items-center mx-4 text-[#6D7073] text-[12px]">
            <!-- 날짜 -->
            <span class="mr-4 border-r-2 pr-4"> 2023. 11. 18, 수요일 </span>

            <!-- 시간 -->
            <span class="mr-4 border-r-2 pr-4"> 5 : 10 AM </span>

            <!-- 온도 -->
            <span class=""> 30,000,000 원 </span>

        </div>

    </div>
</template>
