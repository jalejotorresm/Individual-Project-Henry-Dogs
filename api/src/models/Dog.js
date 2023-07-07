const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]+$/i,
        },
      },
      minHeight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]*$/,
        },
      },
      maxHeight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]*$/,
        },
      },
      minWeight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]*$/,
        },
      },
      maxWeight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]*$/,
        },
      },
      minLifeSpan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]*$/,
        },
      },
      maxLifeSpan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]*$/,
        },
      },
      image: {
        type: DataTypes.TEXT,
      },
      dbNative: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
