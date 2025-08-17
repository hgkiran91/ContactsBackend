const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbconnection");

const Users = sequelize.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    userName: {
        type: DataTypes.STRING,
        required: [true, "Please add the user name"]
    },
    email: {
        type: DataTypes.STRING,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: DataTypes.STRING,
        required: [true, "Please add the user password"]
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    timestamps: true
});

module.exports = Users;