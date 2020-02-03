# Cryptolabz BACKEND

### Setting up sequelize ORM
1.  install sequelize global `sudo npm i -g sequelize-cli`
2. go to ORM folder `cd backend/mods/ORM/`
3. type `sequelize db:create && sequelize db:migrate`  

*(in case of issues, don't hesitate to sequelize`db:migrate:undo:all`*)

### Project information
------------
`/mods` contains all specifics modules, folder to work in
- `controller/` link between sequelize and express
- `log/` Specific logger
- `ORM/` Sequelize ORM
- `routes/` express routes
- `scheduler/` Cryptocurrencies information getter



