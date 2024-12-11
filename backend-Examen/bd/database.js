const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('logApp','root','Amorita26',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;