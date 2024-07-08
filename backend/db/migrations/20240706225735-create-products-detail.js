'use strict';


let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductsDetails', {
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
          model: 'Presupuestos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('ProductsDetails');
  }
};
