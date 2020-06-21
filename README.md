## 텀블벅 과제 프로젝트

프론트는 create-react-app으로 초기 셋팅을 하고 진행했습니다. 백엔드는 express를 이용하여 셋팅했습니다. <br/>백엔드는 텀블벅에서 제시해 주신 주소 데이터 파일(addresses.json)을 불러들여 동작하며, <br/>기본 배송지 수정/배송지 추가/배송지 삭제 시 해당 데이터 파일의 내용이 변경되도록 설계했습니다. <br/>따라서 사이트 동작을 통해 데이터를 수정했을 시 텀블벅에서 주신 기본 데이터 파일의 내용과 상이해질 수 있으니 이 점 양해 부탁드립니다.

## 서버 구동

#### 백엔드

백엔드에서 데이터를 처리하여 이를 기반으로 진행되기 때문에 <br/>백엔드 서버를 먼저 구동시킨 뒤 프론트를 구동해주시길 바랍니다.

백엔드 서버 : http://localhost:8000/

```
cd back

npm i

npm run start
```

#### 프론트

프론트 서버 : http://localhost:3000/

```
cd client

npm i

npm start
```

## 폴더 구조

```
client
├── node_modules
├── public
├── src
│   ├── ㅁ components  : 컴포넌트 폴더
│   ├── ㅁ hooks       : 커스텀 훅 폴더
│   ├── ㅁ module      : 리덕스 폴더
│   ├── ㅁ pages       : 페이지 폴더 (route)
│   ├── ㅁ saga        : 리덕스 사가 폴더
│   ├── ㅁ styles      : 스타일 폴더 (global-styles)
│   ├── App.tsx
│   ├── index.tsx
│   └── Router.tsx     : 라우터 설정 파일
├── .eslint.json
├── .gitignore
├── .prettierrc.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── yarn.lock

back
├── node_modules
├── src
│   ├── ㅁ data        : 데이터 폴더 (addresses.json)
│   ├── ㅁ routes      : 라우트 폴더
│   └── index.tsx
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.prod.json
├── tslint.json
└── yarn.lock
```

## 스타일링

스타일링은 styled compoents를 이용하여 진행했습니다.

## 기능 구현

### 탭

각 페이지 Route는 src 폴더의 Router 파일에 react-router-dom을 이용하여 연결했습니다. <br/>/src/pages 폴더에 각각의 페이지 파일이 있습니다.<br/>
/src/compoents/Header에 탭 UI를 구현하고, /src/compoents/Layout의 Layout 컴포넌트에서 <br/>Header 컴포넌트를 가져와 각 페이지에 공통적으로 탭이 보여지도록 했습니다.

```
<Link to="/profile">
	<Tab activeTab={route === '/profile'}>프로필</Tab>
</Link>
```

Layout 컴포넌트에서 Header로 현재 pathname을 route props로 전달해주어, <br/>Header 컴포넌트에서 각 탭에 activeTab props를 전달하여 현재 pathname과 <br/>탭에 지정된 pathname이 일치할 경우 activeTab props를 true로 주어 <br/>해당 값을 조건으로 스타일을 변경해주었습니다.

### 토스트 UI

리덕스에 toastSentence라는, 토스트 메시지를 저장하는 statue를 선언하고 <br/>
배송지 삭제와 기본설정이 발생할때마다 toastSentence의 내용을 바꿔주었습니다.<br/>
프론트 단의 /src/page/Address.tsx에서 toastSentence이 공백이 아닐 경우 ToastMessage 컴포넌트를 나타나게 하고, <br/>해당 컴포넌트에 토스트 UI안의 메시지 내용을 props로 전달합니다.<br/>
toastSentence의 내용에 변동이 있을때마다 toastSentence의 내용이 공백이 아니라면 3초 후에 공백으로 바꾸어주는 <br/>setTimeout 동작을 실행함으로써 3초후에 toastMessage 컴포넌트가 사라지도록 합니다.<br/>
1.5초동안 진행되는 fadeOut 애니메이션의 경우 ToastMessage 컴포넌트에서 컴포넌트가 나타나면 <br/>1.5초 후에 opacity를 0으로 바꾸는 disappear 클래스를 추가하고, <br/>css transition의 시간을 1.5초로 설정하여 구현했습니다.

### 모달 UI

각 모달이 화면에 보여지는 여부를 결정하는 state를 두고, <br/>해당 state가 true일 경우 화면에 모달 컴포넌트가 나타나도록 했습니다. <br/>dim 기능이 있는 모달의 경우 반투명한 Dim div를 두어 화면을 전부 차지하도록 하고 <br/>그 위에 모달을 나타나게 하여 Dim div를 클릭할 경우 모달이 닫히도록 설정했습니다.

```
useEffect(() => {
	document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width: 100%;`;
	return () => {
		const scrollY = document.body.style.top;
		document.body.style.cssText = `position: ""; top: ""; width: "";`;
		window.scrollTo(0, parseInt(scrollY || '0') * -1);
	};
}, []);
```

모달이 나타나면 document.body의 position을 fixed로 바꾸고 <br/>top 값을 현재 스크롤 값으로 바꾸어 주어 스크롤 동작이 발생하지 않도록 했습니다.<br/>
각 배송지의 오른쪽 더보기 버튼을 누르면 나오는 layer의 경우 <br/>기존의 Dim 모달과 동일한 형식으로 하되 스크롤 잠금 기능을 넣지 않았고, <br/>Dim div의 background-color를 투명하게 하여 보이지 않도록 설정했습니다.

### 데이터 처리

데이터의 처리는 백엔드에서 진행되며, 프론트에선 리덕스 사가를 이용하여 <br/>백엔드에서 데이터를 처리하는 비동기적 처리를 수행했습니다. <br/>데이터 처리를 요청하는 request 액션을 보내면 이를 리덕스 사가에서 감지하여 백엔드에 요청을 전달하고, <br/>해당 요청을 처리하여 success 액션에 데이터 결과 값을 넣어주어 프론트의 리덕스와 데이터를 일치시켰습니다.

### 등록된 배송지 불러오기

loadAddressRequest 액션은 lastId를 argument로 전달받습니다. <br/>LOAD_ADDRESS_REQUEST가 감지되면 리덕스 사가에서 백엔드의 GET /address API로 데이터를 요청합니다. <br/>데이터 결과를 전달받으면 loadAddressSuccess 액션에 해당 데이터 값을 전달하여 프론트의 리덕스 데이터도 바꾸어 줍니다.

address 페이지에 들어가면 lastId 없이 데이터를 요청하여 초기의 5개 데이터를 가져옵니다. <br/>추가로 더 가져올 데이터가 있을 경우 리덕스의 hasMoreAddresses state는 true로, 없을 경우는 false로 설정됩니다. <br/>hasMoreAddresses가 true라면 화면에 더보기 버튼을 보여줍니다. <br/>더보기 버튼을 누르면 현재 addresses 배열의 length를 lastId argument로 전달하여 loadAddressRequest 액션을 실행하여, <br/>데이터 요청 성공 시 lastId를 기준으로 5개의 데이터를 가져와 화면에 보여줍니다.

### 배송지 등록

addAddressRequest 액션은 등록할 데이터 object를 전달받습니다. <br/>ADD_ADDRESS_REQUEST가 감지되면 리덕스 사가에서 백엔드의 POST /address API로 데이터 등록을 요청합니다. <br/>데이터가 등록되면 등록된 데이터를 프론트로 다시 전달하여 리덕스의 addresses state에도 <br/>해당 데이터를 추가하여 데이터를 일치시킵니다.

### 배송지 삭제

deleteAddressRequest 액션에 해당 데이터의 id값을 전달합니다. <br/>DELETE_ADDRESS_REQUEST가 감지되면 리덕스 사가에서 백엔드의 DELETE /address:id API로 데이터 삭제 처리를 요청합니다. <br/>기준 데이터에서 해당 id값을 가지고 있는 데이터를 제외시킨 뒤, 해당 id를 프론트로 다시 전달하면 <br/>현재 리덕스의 addresses state에서도 해당 데이터를 제외시켜 데이터를 일치시킵니다.

### 기본 배송지 설정

처음 address 페이지에 들어가면 getDefaultRequest 액션을 실행시켜 <br/>백엔드의 GET /address/default API로 기본 배송지 id값을 요청합니다. <br/>기본 배송지 id값을 받으면 리덕스의 defaultId 데이터를 해당 id로 수정합니다.

Address page에서 기본 배송지로 설정된 배송지는 <br/>무조건 최상단에 보여주기 위해 다음과 같이 코드를 작성했습니다.

```
const defaultIndexInArray = useMemo(() => addresses.findIndex((v) => v.id === defaultId), [addresses, defaultId]);
//리덕스에서 addresses, defaultId state를 가져와 addresses에서 defaultId의 index가 몇인지를 파악합니다.
```

<br/>

```
{defaultIndexInArray !== -1 && (
	<AddressItem address={addresses[defaultIndexInArray]} defaultSet={true} key={defaultId} />
)}
//만약 defaultIndexInArray가 -1이 아니라면 addresses 내에 기본 배송지가 존재한다는 의미이므로 상단에 따로 빼서 보여줍니다.
{addresses.
    filter((v) => {
	if (defaultIndexInArray !== -1) {
		return v.id !== defaultId;
	} else return true;
    })
    .map((v) => {
	return <AddressItem address={v} defaultSet={false} key={v.id} />;})
}
//나머지 addresses 데이터는 하단에 기본 배송지 주소를 제외한 값을 map을 사용하여 뿌려줍니다.
```

다른 배송지를 기본 배송지로 설정한다면 setDefaultRequest 액션에 argument로 해당 배송지의 id값을 전달합니다. <br/>리덕스 사가에서 SET_DEFAULT_REQUEST를 감지하면 백엔드의 POST /address/default API에 해당 id값을 전달하여 데이터를 수정하고, <br/>백엔드에서 id를 다시 전달하면 해당 값을 리덕스의 defaultId state로 설정하여 데이터를 일치시킵니다.

## REST API

### GET /address API

배송지 데이터를 가져오는 API 입니다. 최대 5개까지 전달하며, 쿼리값으로 lastId를 전달받습니다. <br/>lastId는 데이터를 더보기로 불러올 경우 현재 데이터의 length를 전달하여 불러올 데이터의 기준선을 정합니다. <br/>json 파일 lastId를 기준으로 5개를 자른 배열을 전달하며 lastId가 전달되지 않았다면 lastId를 0으로 두어 처음의 5개 데이터를 전달합니다.<br/>
불러온 데이터가 없거나, 불러온 데이터의 마지막 id값이 json 데이터의 마지막 id값과 일치할 경우 <br/>더이상 불러올 데이터가 없는 것이기 때문에 hasMoreAddresses를 false로 두어 <br/>address 데이터들과 함께 전달합니다.

### POST /address API

배송지 데이터를 기록하는 API 입니다. <br/>프론트로부터 data값을 전달받으면 이를 address 데이터의 규격에 맞게 수정한 뒤 addresses.json 파일의 배열 앞부분에 추가하여 json파일을 수정합니다. <br/>추가된 데이터를 res.json으로 전달합니다.

### DELETE /address:id API

배송지 데이터를 삭제하는 API 입니다. <br/>프론트로부터 삭제할 데이터의 id값을 전달받으면 addresses.json 파일에서 해당 id값과 일치하는 데이터를 찾아내어 삭제합니다. <br/>res.send로 해당 id 값을 전달합니다.

### GET /address/default API

기본 배송지로 설정된 배송지의 id값을 가져오는 API입니다. <br/>addresses.json 파일에 적힌 default값을 읽어 res.json으로 전달합니다.

### PUT /address/default API

기본 배송지 id값을 변경하는 API입니다. <br/>id값을 프론트로부터 전달받으면 addresses.json 파일의 default값을 해당 id값으로 수정하고 id값을 res.json으로 반환합니다.

## 얻어가는 것

1. 타입스크립트의 대략적인 개념만 알고 타입스크립트를 써야 할 필요성 등에 대해 자세히 인지하지 못했는데, 이번 프로젝트를 진행하면서 타입스크립트를 직접 사용해보고, 타입스크립트를 사용함으로써 오는 이점을 경험해볼 수 있었습니다. 처음엔 타입스크립트 사용이 막막하게만 느껴졌는데, 문제를 해결하고 개선하는 과정에서 타입스크립트에 관심을 갖게 되었으며 제 자신이 성장할 수 있는 계기가 된것 같습니다. 프로젝트 제출 이후 타입스크립트에 대해서 본격적으로 공부해 볼 생각입니다.

2. 기존에 토이프로젝트를 할 때엔 원하는 UI 및 기능이 구현되지 않을 경우 이를 구현하기 쉬운 방향으로 다듬어가며 진행했는데, 기재된 내용 그대로 구현하고자 하니 그 과정에서 여러가지 문제점에 부딪혔습니다. 이를 온전하게 구현하기 위한 문제해결과정에서 어떤 식으로 응용하여 기능을 구현할 수 있는지, 오류가 나타났을 경우 이를 어떤 키워드로 검색해야 원하는 답을 찾기에 용이한지 등 많은 것을 배웠습니다.

3. REST API 요구사항을 뒤늦게 확인하여 마감일에 맞추기 위해서 시간과 목표치를 정하여 이전보다 체계적으로 작업을 진행했습니다. 결국 정해진 시간 내에 제가 원하는 기능을 구현해낼 수 있었습니다. 데드라인이 정해진 작업을 경험해볼 수 있었고, 짧은 시간동안 빠르게 원하는 것을 구현해내면서 이 과정에서 많은 것을 경험하고 배울 수 있었습니다.
