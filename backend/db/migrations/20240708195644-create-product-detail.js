'use strict';
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      presupuestoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Presupuestos', // Make sure 'Presupuestos' matches your actual Presupuesto model
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precioUnit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      descuento: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      precioTotal: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'ProductDetails'
    await queryInterface.dropTable(options);
  }
};
