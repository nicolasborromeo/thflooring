'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const presupuestosSeedData = require('../../../../render-db-dump-into-seed/presupuestos_seed')

const { Presupuesto } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Presupuesto.bulkCreate(presupuestosSeedData, { validate: true });
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
