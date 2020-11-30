module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('posts', {
        user_id :{
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        post:{
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        title:{
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        view_count:{
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        date:{
            type : DataTypes.DATE,
            allowNull : false,
        },
    },
    {
    timestamps:false,
    });
};