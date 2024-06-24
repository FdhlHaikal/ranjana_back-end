var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Laporan } = require('../models');

const v = new Validator();

router.get('/', async (req, res) => {
    const laporan = await Laporan.findAll();
    return res.json(laporan);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const report = await Laporan.findByPk(id);
    return res.json(report || {});
});

router.post('/', async (req, res) => {
    const schema = {
        nama: 'string',
        email: 'string',
        keluhan: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    const report = await Laporan.create(req.body);

    res.json(report);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let report = await Laporan.findByPk(id);

    if (!report) {
        return res.json({ message: 'Laporan not found' });
    }

    const schema = {
        nama: 'string|optional',
        email: 'string|optional',
        keluhan: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    report = await report.update(req.body);
    res.json(report);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const report = await Laporan.findByPk(id);

    if (!report) {
        return res.json({ message: 'Laporan not found' });
    }

    const schema = {
        nama: 'string|optional',
        email: 'string|optional',
        keluhan: 'string|optional'
    }

    await report.destroy();

    res.json({
        message: 'Laporan is deleted'
    });
});

module.exports = router;