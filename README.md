# Express-fargate-CDK CRUDアプリ

ここにhttps化した後にリンクを貼る。

Expressで作成したシンプルなCRUDアプリです。
インフラはAWSを使用しています。
VPC、セキュリティグループ、RDS、ECS(fargate)などのAWSリソースをCDKで構築しました。

# 使用技術
- Node.js v16.13.2
- Express 4.16.1
- Sequelize 　6.15.1
- PostgreSQL
- Docker
- AWS
    - CDK(TypeScript)
    - RDS(PostgreSQL) 
    - ECR
    - ECS(fargate)
    
## Node.js、Express、Sequelize、PostgreSQLを使う理由
単純に以前の職場で使用していた技術だったため。

## Docker(コンテナ技術)を使う理由


### CD(継続的デリバリー)
リポジトリのmasterブランチのソースコードが変更されるたびに、自動で本番環境にデプロイする仕組み

### CircleCIとAWS Code４兄弟によるCI/CDパイプライン　構成図
CI/CDパイプラインをあらかじめ構築しておくことで、バグの発生を抑えつつ、アプリの機能追加、変更を1日に何回も本番環境にリリースすることが可能となりました。
![472927dd-4a42-472d-96ed-77cdda6e28ae](https://user-images.githubusercontent.com/58723017/132625929-31f3402b-04c0-41f8-b6d4-d6570822e3e0.png)

# AWS(インフラ)構成図
![名称未設定 drawio (1)](https://user-images.githubusercontent.com/58723017/132848710-460f3020-e3a4-4d4d-b150-b9edf919aaf3.png)

# 機能一覧
- ユーザー登録、ログイン機能
- CRUD機能
- タグ機能
- いいね機能(vue.js)
- フォロー機能(vue.js)

# テスト
- 単体テスト(PHPUnit)
