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
単純に以前の職場で使用していた技術だったため使用する。

## Docker(代表的なコンテナ技術)を使う理由
仮想マシン(単一のサーバー上で複数のOSを稼働させる技術)とは違い、コンテナは、サーバーのリソース(CPU、メモリ、ファイルシステム、プロセス空間など)を効率的に使用でき、起動や停止が高速で行えます。そして、1個のコンテナイメージから複数のコンテナを起動できるため、必要な数だけ起動や停止が可能という「スケーラビリティ」にも優れています。また、Docker(同じイメージ)を使えば開発チームの環境を全く同じにできるのもメリットです。

## ECS(fargate)を使う理由
- ECS(EC2起動タイプ)では、コンテナのためのEC2インスタンスのOSやDockerAgent、ミドルウェアなどの構築や設定操作管理が必要。
- fargateでは、上記の手間が省ける。
- インスタンスタイプやクラスター管理が不要になる。
- 負荷に応じたオートスケール機能をキャパシティの考慮不要で利用できる。

## CDKを使う理由

# AWS(インフラ)構成図
![名称未設定 drawio (1)](https://user-images.githubusercontent.com/58723017/132848710-460f3020-e3a4-4d4d-b150-b9edf919aaf3.png)
