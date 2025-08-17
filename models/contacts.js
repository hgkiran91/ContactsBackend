const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbconnection");

const Contacts = sequelize.define('Contacts', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    contact: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        model: "users", // <<< Note, its table's name, not object name
        key: "userId", // <<< Note, its a column name
        required: true
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},
 {
    timestamps: true
 });

module.exports = Contacts;