# イメージ指定
FROM node:14

# 作業ディレクトリ作成&設定
WORKDIR /src

# COPY ./app/package*.json ./

COPY ./app /src

# 環境変数設定
ENV NODE_ENV="production"

RUN npm install -g sequelize sequelize-cli pg --save

RUN npm install

COPY startup.sh /startup.sh
RUN chmod 744 /startup.sh

CMD ["/startup.sh"]