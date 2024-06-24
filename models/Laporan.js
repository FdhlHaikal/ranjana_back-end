module.exports = (sequelize, DataTypes) => {
    const Laporan = sequelize.define('Laporan', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        keluhan: {
            type: DataTypes.TEXT,
        },
    }, {
        tableName: 'laporan'
    });

    return Laporan;
}