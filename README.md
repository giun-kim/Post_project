# [掲示板] Post_project
node.js express + react + mysqlを使ったCRUD＆ログインの具現 　

# version
react - 17.0.1    
express - 4.16.1  
node.js - 12.16.3  

# 使用ライブラリー
- ### node.js express
jsonwebtoken  
mysql2  
sequelize  
nodemon  
- ### react  
react-router-dom  
axios  
concurrently  

#### proxy 設定
```
/client/package.json
{
 "dependencies":{ ...},
 "scripts":{...},
 "proxy":"url" // proxy 設定
}
```


#### 実行方法
```
git clone https://github.com/giun-kim/Post_project.git
cd server
npm install
cd client
npm install

/post_project/client
npm start dev // 서버, 클라이언트 동시 실행 (concurrently 라이브러리)
```

# 参考資料
#### React Hook   (https://ko.reactjs.org/docs/hooks-intro.html)

#### ログイン具現   (https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

#### pagenation   (https://www.youtube.com/watch?v=IYCa1F-OWmk)
