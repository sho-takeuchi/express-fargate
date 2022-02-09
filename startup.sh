#!/usr/bin/env bash
# sequelize-cli init
# sequelize-cli model:generate —name user —attributes firstName:string,lastName:string,email:string
sequelize-cli db:migrate
npm start