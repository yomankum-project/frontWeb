<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import navbar from './components/navBar.vue'
import sidebar from './components/sideBar.vue'
import privateNavbar from './components/privateNavBar.vue'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia';

const user = useUserStore();
const { info } = storeToRefs(user);

const navBarHeight = ref('80px')

</script>

<template>
  <div v-if="info.checkLogin == 'logout'" class="w-[100vw] h-[100vh] min-w-[330px] min-h-[667px] ">
    <!-- navigation bar -->
    <div class="flex justify-center ">
      <navbar id="navBar" class="navbar z-20" />
    </div>

    <!-- 화면 출력 -->
    <div id="content_div" class="flex flex-col items-center justify-center content screen">
      <RouterView class="" />
    </div>
  </div>

  <div v-else-if="info.checkLogin == 'login'" class="w-[100vw] h-[100vh] min-w-[330px]">
    <div class="flex min-h-full">
      <!-- first column -->
      <div class="basis-1/6">
        <!-- left sidebar -->
        <sidebar class="h-full" />
      </div>
      <!-- second column -->
      <div class="basis-5/6 border-l-2 flex flex-col p-8">
        <!-- navigation bar -->
        <div class="basis-[12%] border-b-2">
          <privateNavbar class="h-full" />
        </div>
        <!-- main content -->
        <div class="basis-[88%] mt-8 ">
          <RouterView class="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#navBar {
  height: v-bind(navBarHeight);
}

#view {
  height: calc(100% - v-bind(navBarHeight));
}

.screen {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>

<style>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

#app {
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

/* 핸드폰 */
@media (min-width:0px) and (max-width:770px) {
  html {
    font-size: 12px;
  }

  .scroll-btn {
    visibility: hidden;
  }

  .content {
    width: 100%;
  }

  .bg_card {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 60%;
  }

  .card {
    background-color: white;
    width: 90%;
  }

  .navbar {
    width: 100%;
  }

  .footer {
    width: 100%;
  }

  .text-title {
    font-size: 25px;
  }

  .text-subtitle {
    font-size: 10px;
  }

  .button {
    width: 70px;
    height: 30px;
  }
}

/* 태블릿 */
@media (min-width:770px) and (max-width:1200px) {

  /* .scroll-btn {
    cursor: pointer;
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--surface-700);
    color: aliceblue;
  } */

  .content {
    width: 770px;
  }

  .navbar {
    width: 770px;
  }

  .bg_card {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 60%;
  }

  .card {
    background-color: white;
    width: 589px;
  }

  .footer {
    width: 770px;
  }

  .text-title {
    font-size: 40px;
  }
}

/* 데스크탑 */
@media (min-width:1200px) {

  /* .text-title {
    font-size: 1.5rem;
  } */

  /* .scroll-btn {
    cursor: pointer;
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--surface-700);
    color: aliceblue;
  } */

  .content {
    width: 1198px;
  }

  .navbar {
    width: 1198px;
  }

  .card {
    height: 750px;
    width: 589px;
  }

  .bg_card {
    height: 750px;
    width: 589px;
    margin-right: 20px;
  }

  .footer {
    width: 1198px;
  }

  .text-title {
    font-size: 40px;
  }
}


/* Ripple effect */
.ripple {
  background-position: center;
  transition: background 0.8s;
}

.ripple:hover {
  background: #d0d2d3 radial-gradient(circle, transparent 1%, #d0d2d3 1%) center/15000%;
}

.ripple:active {
  background-color: #adb3b8;
  background-size: 100%;
  transition: background 0s;
}

/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
.no-scroll::-webkit-scrollbar {
  display: none;
}

.no-scroll {
  -ms-overflow-style: none;
  /* 인터넷 익스플로러 */
  scrollbar-width: none;
  /* 파이어폭스 */
}
</style>