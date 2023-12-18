# Front web repo markdown

# YOMANKUM_frontend

요만큼 프로젝트의 웹 프론트엔드 개발 레포지토리 입니다.

Vue 3 + Vite + Tailwindcss + PrimeVue를 사용하였습니다.

### 프로젝트 설정

개발 시 다음과 같은 IDE 설정을 추천 합니다.

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

1. `npm install` : git clone 이후 첫 패키지 설치 용입니다.
2. `npm run dev` : 개발 용으로 프로젝트를 구동할 때의 명령어 입니다.
3. `npm run build` : 배포 버전을 제작할 때 사용되는 명령어 입니다. 

### **협업 시 개발 프로세스**

특정 기능 브랜치는 feature 브랜치를 생성하여 진행 하여야 합니다.

feature에서 develop 브랜치로의 merge는 PR을 거쳐야 합니다.

개발 브랜치는 develop 입니다. 

배포 버전 브랜치는 main 입니다. main에 push 되면 자동으로 ci 과정이 수행 됩니다.

배포 버전은 주기적으로 업데이트 됩니다.

배포 버전에 이슈가 생성될 경우, hotfix 브랜치에서 작업을 수행 합니다.
