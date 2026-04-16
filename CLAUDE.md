# Weather Info (날씨 서비스)

## Architecture

FSD(Feature Sliced Design) 아키텍처를 사용합니다.

```
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

## Build & Test Commands

```bash
npm install # 의존성 설치
npm dev # dev 서버 실행
npm build # build
npm lint # eslint 검사
npm format:check # prettier 검사
```

## Tech Stack

- React
- TypeScript
- TailwindCSS
- TanStack Query
- Shadcn

## Coding Conventions

- 파일명: kebab-case (`tw-merge.ts`)
- default export 대신 named export 사용
- TailwindCSS 유틸리티 클래스 사용

## Critical Rules

- .env 파일은 절대 커밋하지 마세요
- main 브랜치에 직접 push하지 마세요
