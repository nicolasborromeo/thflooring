'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {

    static associate(models) {
      ProductDetail.belongsTo(models.Presupuesto, {
        foreignKey: 'presupuestoId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
      });
    }
  }
  ProductDetail.init({
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
    modelName: 'ProductDetail',
    tableName: 'ProductDetails',
    timestamps: true
  });
  return ProductDetail;
};
