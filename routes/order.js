var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Order } = require('../models');

const v = new Validator();

router.get('/', async (req, res) => {
    const order = await Order.findAll();
    return res.json(order);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const pesanan = await Order.findByPk(id);
    return res.json(pesanan || {});
});

router.post('/', async (req, res) => {
    const schema = {
        idPesanan: 'string',
        nama: 'string',
        pembayaran: 'string',
        jumlahTiket: 'string',
        total: 'string',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    const pesanan = await Order.create(req.body);

    res.json(pesanan);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let pesanan = await Order.findByPk(id);

    if (!pesanan) {
        return res.json({ message: 'Pesanan not found' });
    }

    const schema = {
        idPesanan: 'string|optional',
        nama: 'string|optional',
        pembayaran: 'string|optional',
        jumlahTiket: 'string|optional',
        total: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    pesanan = await pesanan.update(req.body);
    res.json(pesanan);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const pesanan = await Order.findByPk(id);

    if (!pesanan) {
        return res.json({ message: 'Pesanan not found' });
    }

    const schema = {
        idPesanan: 'string|optional',
        nama: 'string|optional',
        pembayaran: 'string|optional',
        jumlahTiket: 'string|optional',
        total: 'string|optional',
    }

    await pesanan.destroy();

    res.json({
        message: 'Pesanan is deleted'
    });
});

module.exports = router;