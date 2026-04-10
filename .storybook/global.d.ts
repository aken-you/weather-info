// Storybook에서 CSS import 타입 에러 방지용 선언
// .storybook 폴더에서 상대경로로 src/global.d.ts를 인식하지 못할 수 있으므로, 별도 선언 파일을 둡니다.
declare module '*.css'
