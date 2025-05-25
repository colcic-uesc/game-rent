'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define('Pagamento', {
    valor: DataTypes.DECIMAL,
    data_pagamento: DataTypes.DATE,
    metodo: DataTypes.STRING,
    status: DataTypes.STRING,
    id_aluguel: DataTypes.INTEGER
  }, {});
  Pagamento.associate = function(models) {
    // associations can be defined here
  };
  return Pagamento;
};