import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
    },
    publisher_year: {
        type: DataTypes.INTEGER,
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'authors',
            key: 'id',
        }
    },

},
    {
        timestamps: false,
        tableName: 'books',

    }
);
export default Book;