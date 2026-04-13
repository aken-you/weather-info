# Weather Info

## 프로젝트 실행 방법

```bash
npm install # 의존성 설치
npm dev # dev 서버 실행
```

.env 파일 설정

```
VITE_KMA_API_KEY=
VITE_KAKAO_REST_API_KEY=
```

## 기술 스택

- React
- TypeScript
- TailwindCSS
- TanStack Query
- Shadcn

## 기능

## 고려한점

### FSD 아키텍쳐

FSD 아키텍처 layer, slice, segment 정의는 다음과 같습니다.

```bash
src/
├── app/                  # Layer: 앱 초기화 및 설정 (Providers 설정)
│
├── pages/                # Layer: Pages:
│   ├── home/
│   │   └── ui/           # Segment: 홈 페이지
│   ├── favorite/
│   │   └── ui/           # Segment: 즐겨찾기 페이지 (모바일에서만 사용)
│   ├── edit-favorite/
│   │   └── ui/           # Segment: 즐겨찾기 수정 페이지
│   ├── add-favorite/
│   │   └── ui/           # Segment: 즐겨찾기 추가 페이지
│   └── address-weather/
│       └── ui/           # Segment: 날씨 상세 페이지
│
├── widgets/             # Layer: Widgets
│   ├── favorite/
│   │   └── ui/          # Segment: 즐겨찾기 큰 UI 블럭 (ex: 즐겨찾기 리스트가 있는 sidebar)
│   └── weather/
│       ├── ui/          # Segment: 날씨 큰 UI 블럭 (날씨 정보를 보여주는 section)
│       └── lib/         # Segment: weather ui에서 사용하는 유틸 함수 / 커스텀훅
│
├── features/              # Layer: Features - 사용자와의 인터렉션이 일어나는 하나의 기능
│   ├── favorite/
│   │   └── ui/           # Segment: 즐겨찾기 인터렉션 UI
│   └── location/
│       ├── ui/          # Segment: 장소 인터렉션 UI
│       ├── model/       # Segment: 장소
│       └── lib/         # Segment: lib
│
├── entities/              # Layer: Entities - 비지니스 엔티티
│   ├── location/
│   │   └── api/         # Segment: 장소 GET 요청
│   └── weather/
│       ├── ui/          # Segment: 날씨 데이터를 보여주는 UI
│       ├── model/       # Segment: 날씨 엔티티
│       ├── lib/         # Segment: 날씨 entities에서 사용하는 유틸
│       └── api/         # Segment: 날씨 GET 요청
│
└── shared/                # Layer: Shared
    ├── ui/               # Segment: 공통 컴포넌트 (ex: Button, Input)
    ├── config/           # Segment: 상수
    ├── model/            # Segment: 전역에서 사용하는 모델 (ex: context)
    ├── lib/              # Segment: 유틸
    └── api/              # Segment: 공통 api 요청 함수
```

### 반응형

모바일뷰와 데스크탑뷰가 다르다보니, 어떻게 다른 스타일을 적용할지 고민이었습니다.
다음과 같은 기준으로 스타일을 적용했습니다.

- 간단한 스타일링: 미디어쿼리
- 컴포넌트 UI 표시 여부가 달라질 경우: useDeviceType 커스텀 훅 활용
  - useDeviceType: 데스크탑/모바일 둘 중 어느 뷰인지 알려주는 훅

### 지역 검색

검색어에 입력할 때마다 버벅거림이 심하여, useDebounce을 통해 디바운스를 적용하였습니다.

### 도메인별 쿼리 옵션 중앙화

도메인 별로 queryOptions를 한 곳에서 관리하도록 중앙화했습니다.
queryKey와 queryFn을 함께 관리해 응집도와 유지보수성을 높이는 데 초점을 뒀습니다.

### Suspense

데이터를 불러오는 컴포넌트는 성공적으로 응답온 데이터에 집중할 수 있도록 Suspense를 적용하였습니다.

```tsx
<Suspense fallback={<WeatherSection.Loading />}>
  <WeatherSection currentAddress={currentAddressObj.addressName} address={address} location={location} />
</Suspense>
```
