'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Presupuesto } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Presupuesto.bulkCreate([
      {
        codigo: 1001,
        vendedor: 'IGNACIO GHIGLIONE',
        telVendedor: '515544332',
        fecha: new Date('2024-06-20'),
        fechaVenc: new Date('2024-07-20'),
        cliente: 'DANIELA',
        direccion: 'Av. Rivadavia 1234',
        provincia: 'Buenos Aires',
        localidad: 'CABA',
        codigoPostal: '1406',
        cuit: '20-12345678-9',
        emailCliente: 'daniela@example.com',
        telCliente: '1122334455',
        condicion: 'CONSUMIDOR FINAL',
        comentarios: 'LOS VALORES SON IVA INCLUIDO PRESUPUESTO SUJETO A VISITA TECNICA',
        iva: true,
        ivaDisc: false,
        total: 3192.37,
        moneda: 'USD'
      },
      {
        codigo: 1002,
        vendedor: 'IGNACIO GHIGLIONE',
        telVendedor: '515544332',
        fecha: new Date('2024-06-21'),
        fechaVenc: new Date('2024-07-21'),
        cliente: 'MARTIN',
        direccion: 'Av. de Mayo 567',
        provincia: 'CABA',
        localidad: 'CABA',
        codigoPostal: '1408',
        cuit: '27-98765432-1',
        emailCliente: 'martin@example.com',
        telCliente: '1122334455',
        condicion: 'MONOTRIBUTISTA',
        comentarios: 'PRESUPUESTO VÁLIDO POR 30 DÍAS',
        iva: true,
        ivaDisc: true,
        total: 13252.5,
        moneda: 'USD'
      },
      {
        codigo: 1003,
        vendedor: 'MARTIN BOCCAZZI',
        telVendedor: '515544332',
        fecha: new Date('2024-06-22'),
        fechaVenc: new Date('2024-07-22'),
        cliente: 'SOFIA',
        direccion: 'Av. Cordoba 789',
        provincia: 'Córdoba',
        localidad: 'Córdoba Capital',
        codigoPostal: '5000',
        cuit: '30-13579246-0',
        emailCliente: 'sofia@example.com',
        telCliente: '1122334455',
        condicion: 'RESPONSABLE INSCRIPTO',
        comentarios: 'INCLUYE SERVICIO DE INSTALACIÓN',
        iva: true,
        ivaDisc: false,
        total: 15009.37,
        moneda: 'ARG'
      },
      {
        codigo: 1004,
        vendedor: 'CRISTIAN',
        telVendedor: '515544332',
        fecha: new Date('2024-06-23'),
        fechaVenc: new Date('2024-07-23'),
        cliente: 'LUIS',
        direccion: 'Av. San Martin 4321',
        provincia: 'CABA',
        localidad: 'CABA',
        codigoPostal: '1410',
        cuit: '23-24681357-9',
        emailCliente: 'luis@example.com',
        telCliente: '1122334455',
        condicion: 'EXENTO',
        comentarios: 'PAGO EN EFECTIVO TIENE 10% DE DESCUENTO',
        iva: false,
        ivaDisc: true,
        total: 4048.75,
        moneda: 'USD'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Presupuestos';
    const { Op } = require('sequelize');
    await queryInterface.bulkDelete(options, {
      // Specify conditions if needed to delete seeded data
      codigo: {
        [Op.in] : [1001, 1002, 1003, 1004]
      }
    }, {});
  }
};
