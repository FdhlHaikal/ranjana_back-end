module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idPesanan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal: {
            type: DataTypes.DATE,
            allowNull: false
        },
        pembayaran: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlahTiket: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'order'
    });

    return Order;
}