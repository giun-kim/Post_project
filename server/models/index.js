const path = require('path');
const Sequelize = require('sequelize');
const { serialize } = require('v8');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/../config/config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Post, {foreignKey:'user_id', sourceKey:'id'});
db.Post.belongsTo(db.User, {foreignKey:'user_id', targetKey:'id'});

db.User.hasMany(db.Comment, {foreignKey:'user_id', sourceKey:'id'});
db.Comment.belongsTo(db.User, {foreignKey:'user_id', targetKey:'id'});

db.Post.hasMany(db.Comment, {foreignKey:'post_id', sourceKey:'id'});
db.Comment.belongsTo(db.Post, {foreignKey:'post_id', targetKey:'id'});

module.exports = db;
