'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductsDetail.belongsTo(models.Presupuesto, { foreignKey: 'presupuestoId' });
    }
  }
  ProductsDetail.init({
    presupuestoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Presupuestos',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    precioTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductsDetail',
  });
  return ProductsDetail;
};
