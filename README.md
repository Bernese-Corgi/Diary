# 일기 웹사이트 제작

## 요구사항 및 구현

### 페이지 1

![페이지 1](https://user-images.githubusercontent.com/72931773/169482990-680e5b76-b567-4603-a9f5-e730c08ad375.png)


**검색영역** : 텍스트 입력이 되면 diary:contents, diary:title중에 해당 텍스트가 포함된 일기만 표기됩니다.

![검색바2](https://user-images.githubusercontent.com/72931773/169482635-44efea2a-3b72-410b-a03e-bed11c62e195.gif)

**일기 영역**

상단에  diary:title, 중간에 diary:contents, 하단에 diary:created_at이 표기됩니다. diary:contents는 총 3줄까지 표기됩니다. 

![image](https://user-images.githubusercontent.com/72931773/169483196-6fa7ac19-6b5a-4cc1-901b-db531c131e4c.png)

10개씩 페이징되며 스크롤(혹은 로드된 아이템중 맨마지막 아이템이 화면에 표기될때 다음 10개의 일기를 화면에 표기됩니다.) 

![무한스크롤](https://user-images.githubusercontent.com/72931773/169482647-1cba1893-5bc6-4e9d-9d3d-1b2a25bff47a.gif)



### 페이지 2

일기를 하나 클릭하였을 경우 페이지2 형식으로 화면에 표기됩니다. 

일기 제목 - 일기 내용 - 작성일자 순으로 표기되고 일기 내용 부분만 스크롤 됩니다.

![닫기](https://user-images.githubusercontent.com/72931773/169482638-3da56cff-b564-41b6-9acf-08ead3797c8d.gif)

### 페이지 3

기본화면(페이지1)에서 10초 이상 머무르게되면 데이터가 변환됩니다.

기존 로드되어 있는 데이터와 created_at으로 비교하여 더 최신 일기가 있을 경우 상단에 “새로운 일기가 n개(새롭게 파악한 갯수만큼) 추가되었습니다.”라는 메시지를 출력합니다. 

![May-20-2022 17-00-49](https://user-images.githubusercontent.com/72931773/169482590-45e6286b-d322-4e12-9df6-2d44d7728236.gif)

