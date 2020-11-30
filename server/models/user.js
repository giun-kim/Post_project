module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('users', {
        password:{
            type : DataTypes.STRING(70),
            allowNull : false,
        },
        name:{
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        email:{
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        role:{
            type: DataTypes.INTEGER,
            allowNull : true
        },
        token:{
            type : DataTypes.STRING,
            allowNull : true,
        },
        tokenExp:{
            type : DataTypes.STRING(50),
            allowNull : true,
        }
    },
    {
    timestamps:false,
    });
};