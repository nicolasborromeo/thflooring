'use strict';


let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const productsDetails = require('../../../../render-db-dump-into-seed/productDetails_seed')
const { ProductDetail } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await ProductDetail.bulkCreate(productsDetails, {validate: true})  },

  down: async (queryInterface, Sequelize) => {
    // Remove seeded data
    options.tableName = 'ProductDetails'
    await queryInterface.bulkDelete(options, null, {});
  }
};
