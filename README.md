# Weather Info
## 프로젝트 실행 방법

```bash
nvm use
npm install # 의존성 설치
npm run dev # dev 서버 실행
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

### 날씨 조회

맨 처음에는 현재 위치의 날씨를 볼 수 있습니다.

<img width="700" alt="스크린샷 2026-04-13 오후 11 44 48" src="https://github.com/user-attachments/assets/7a373520-5634-4f0f-8e0d-b505aebd04b3" />

현재 위치가 아닌 다른 위치의 날씨도 확인 가능합니다.

- 즐겨찾기의 카드를 클릭하여 즐겨찾기한 지역의 날씨를 확인할 수 있습니다.
- 검색창을 통해, 검색한 지역의 날씨를 확인할 수 있습니다.

<img width="700" alt="스크린샷 2026-04-13 오후 11 44 59" src="https://github.com/user-attachments/assets/52e305bc-0f81-4735-8b89-a09b3a40ece4" />

### 지역 검색

헤더에 있는 검색 input을 클릭하면, 지역을 검색할 수 있는 창이 뜹니다.
검색어 입력 후 지역을 선택하면, 해당 지역의 날씨를 확인할 수 있습니다.

<img width="700" height="900" alt="스크린샷 2026-04-13 오후 11 48 02" src="https://github.com/user-attachments/assets/76f71a3b-7bf6-4cf0-b8a7-c244bfd18803" />

### 즐겨찾기

- 데스크탑: 왼쪽 사이드바에 즐겨찾기 리스트를 볼 수 있습니다.
- 모바일: 하단의 즐겨찾기 탭을 클릭하면, 즐겨찾기 리스트를 볼 수 있습니다.

<img width="379" height="667" alt="스크린샷 2026-04-13 오후 11 50 10" src="https://github.com/user-attachments/assets/e0e2d3bb-e6dc-4e51-bfa1-ac76fd2df0a7" />

#### 즐겨찾기 추가

- 데스크탑: 왼쪽 사이드바의 추가 버튼으로 즐겨찾기를 추가할 수 있습니다.
- 모바일: 즐겨찾기 탭에서 상단에 추가 버튼으로 즐겨찾기를 추가할 수 있습니다.

<img width="700" height="900" alt="스크린샷 2026-04-13 오후 11 51 14" src="https://github.com/user-attachments/assets/27af7d19-42b9-428a-91ca-9998413213bf" />


#### 즐겨찾기 수정

즐겨찾기 카드 더보기 버튼을 클릭하면 드롭다운이 나옵니다. 드롭다운에서 수정 버튼을 클릭하면, 즐겨찾기 수정 페이지로 이동합니다.

<img width="700" height="900" alt="스크린샷 2026-04-13 오후 11 52 00" src="https://github.com/user-attachments/assets/cb3fceeb-bc78-4396-931c-839a6f2a9e08" />

#### 즐겨찾기 삭제

수정과 비슷하게 드롭다운의 삭제 버튼을 클릭하면, 바로 즐겨찾기가 삭제됩니다.


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
