module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('comments', {
        user_id :{
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        comment:{
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        post_id:{
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        date:{
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
    timestamps:false,
    });
};