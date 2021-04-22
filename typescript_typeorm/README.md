# 特別感謝Hyman老師跟Andy老師提供此範例
## How to develop

1. run `npm i`
2. run `npm run dev`
3. 網頁及API入口在 `https://localhost:3000/`

## 沒有DB的解法

1. 使用 terminal 執行 `docker pull postgres`
   相關可以參考 https://hub.docker.com/_/postgres
    (https://docs.microsoft.com/zh-tw/windows/wsl/install-win10
    這個可以在windows安裝linux，就可以玩純docker了， 
    記得bios，的虛擬選項要開，電腦太慢的，就請自行斟酌)
2. 使用 terminal 執行 `docker run -p 5432:5432 --name somename-postgres -e POSTGRES_USER=yourname -e POSTGRES_PASSWORD=yourpassword -d postgres`
3. 建立資料庫
4. 在 src/config/database.ts 及 ormconfig.json 設定剛剛建立的資料庫

## How to use typeorm CLI?

1. run `npx typeorm -h` to show list of available commands

### Migration

#### Create Migration

1. npx typeorm migration:create -n "migration_name"
2. Find the file with timestamp and write migrations into `up`, `down` function

#### Run Migration

1. npm run migrate:up

#### Revert Migration

1. npm run migrate:down


### 尚未處理的問題

- migration 目前只能使用 ormconfig.json，但是我不知道要怎麼把環境變數放到JSON裡面，而程式在對資料庫連線是透過 src/config/database.ts，這樣可以放環境變數，需要研究如何使用統一的做法來連線資料庫

### 目前實作

- logger (log4js)
  - 可產生檔案
  - 可印出request 的內容
- helmet
  - 保護http header 的安全
- body-parser
  - 解析 payload
- https 設定
- typeorm
  - 對 postgres 連線
  - migration 機制
- ts 設定
- tslint 設定
- mount static file
- hot reload

### 部署Docker
打包 docker 可以參考 `gitlab-ci.yml` 我是 job1 先做 npm install 動作， job2 打包成 image， job3 部署到 server 上面，請依照專案不同調整 script

### 部署 K8S
1. 先打包成 docker image 上傳到 repo
1. 先把 k8s 的 `~/.kube/config` 設定到你所要部署的 server context
2. 確認可以正確執行 `kubectl get pods` 成功
3. 部署 k8s 使用 `helm` 的指令，請先安裝 [helm](https://helm.sh/docs/intro/install/)
  ```
  helm upgrade --install windwork ./docker/helm
  ```
