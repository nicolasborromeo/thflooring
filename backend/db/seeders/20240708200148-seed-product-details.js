'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productDetails = [
      {
        presupuestoId: 1,
        codigo: null,
        descripcion: "TEST PF ING INTENSIVE CUMARU",
        cantidad: 100,
        precioUnit: 30,
        descuento: null,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 2,
        codigo: "03019",
        descripcion: "TEST PEGAMENTO CIPEP RENOVATOR",
        cantidad: 150,
        precioUnit: 45,
        descuento: 5,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 2,
        codigo: "01361",
        descripcion: "TEST PF ING INOVARE CURITIBA CLASSIC SMOOTH",
        cantidad: 200,
        precioUnit: 38,
        descuento: 10,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 3,
        codigo: "01939",
        descripcion: "TEST PF ING RUSTIK CURITIBA NATURAL",
        cantidad: 250,
        precioUnit: 36.75,
        descuento: 15,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 3,
        codigo: "01870",
        descripcion: "TEST PF ING CLICK CURITIBA HOPE",
        cantidad: 300,
        precioUnit: 30,
        descuento: 20,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 4,
        codigo: "01993",
        descripcion: "TEST PF ING NATIVE GUAYUVIRA",
        cantidad: 100,
        precioUnit: 49,
        descuento: null,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 4,
        codigo: "03062",
        descripcion: "TEST LACA CIPEP ALTO BRILLO",
        cantidad: 3,
        precioUnit: 75,
        descuento: null,
        precioTotal: 1234.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 4,
        codigo: null,
        descripcion: "TEST PRODUCT WITHOUT CODIGO 1",
        cantidad: 50,
        precioUnit: 20,
        descuento: 5,
        precioTotal: 950,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        presupuestoId: 1,
        codigo: null,
        descripcion: "TEST PRODUCT WITHOUT CODIGO 2",
        cantidad: 75,
        precioUnit: 35,
        descuento: 10,
        precioTotal: 2450,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('ProductDetails', productDetails, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seeded data
    options.tableName = 'ProductDetails'

    await queryInterface.bulkDelete(options, null, {});
  }
};
