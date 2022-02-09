import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'; //ec2に定義されている定数を使用するためimportする。
import * as ecr from '@aws-cdk/aws-ecr';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as rds from '@aws-cdk/aws-rds';

interface CdkStackProps extends cdk.StackProps { //typescriptなので、最初に型付けを行う。これをしないとエラーになる。CdkStackPropsという名前は任意で名付けることが可能。
  tag?: string,
}

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: CdkStackProps) {
    super(scope, id, props);

    if (!props) {
      return;
    }

    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 3 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc
    });

    // let dbSecrets;

    const securityGroup = new ec2.SecurityGroup(this, "securitygroup", { //VPC内にEC2セキュリティグループを作成。
      vpc: vpc,
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'postgres');

    let dbInstance;
    dbInstance = new rds.DatabaseInstance(this, 'db', { //DBインスタンスを作成。
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_11_9 }),
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      databaseName: 'expresspostgrerds3',
      publiclyAccessible: true, // 開発用設定
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,  // 開発用設定
      },
      allocatedStorage: 20,
      securityGroups: [
        securityGroup,
      ],
    });

    const repository = ecr.Repository.fromRepositoryName(this, 'ECR', 'express-fargate-postgres');　//ECRに登録されているリポジトリを呼び出し
    const tag = props.tag || 'latest'; //リポジトリのタグ

    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'Service', { //ALB,Target Group,FargateのECS Service,TaskDefinition,各種ロールやポリシーを自動作成
      cluster,
      memoryLimitMiB: 1024,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repository, tag),
        containerPort: 3000,
        // environment: { //コンテナの中の環境変数を設定
        //   "DB_USER": "postgres",
        //   "DB_PASSWORD": "joruju2248",
        //   "DB_NAME": "expresspostgrerds3",
        //   "DB_PORT": "5432",
        //   "DB_HOST": "cd47ql6ch94dfv.c9vghpd7vi9i.us-east-1.rds.amazonaws.com",
        // },
      },
    });
  }
}
