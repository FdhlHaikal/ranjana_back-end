var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Pengguna } = require('../models');

const v = new Validator();

router.get('/', async (req, res) => {
    const pengguna = await Pengguna.findAll();
    return res.json(pengguna);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await Pengguna.findByPk(id);
    return res.json(user || {});
});

router.post('/', async (req, res) => {
    const schema = {
        nama: 'string',
        telepon: 'string',
        email: 'string',
        password: 'string'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    const user = await Pengguna.create(req.body);

    res.json(user);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let user = await Pengguna.findByPk(id);

    if (!user) {
        return res.json({ message: 'Pengguna not found' });
    }

    const schema = {
        nama: 'string|optional',
        telepon: 'string|optional',
        email: 'string|optional',
        password: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    user = await user.update(req.body);
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await Pengguna.findByPk(id);

    if (!user) {
        return res.json({ message: 'Pengguna not found' });
    }

    const schema = {
        nama: 'string|optional',
        telepon: 'string|optional',
        email: 'string|optional',
        password: 'string|optional'
    }

    await user.destroy();

    res.json({
        message: 'Pengguna is deleted'
    });
});

module.exports = router;