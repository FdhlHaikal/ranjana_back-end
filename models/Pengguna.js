module.exports = (sequelize, DataTypes) => {
    const Pengguna = sequelize.define('Pengguna', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telepon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'pengguna'
    });

    return Pengguna;
}