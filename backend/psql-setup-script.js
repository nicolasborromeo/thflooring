const { sequelize } = require('./db/models');

console.log('Current working directory:', process.cwd());
console.log('Trying to load sequelize:', require.resolve('sequelize'));


sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if(!data.includes(process.env.SCHEMA)) {
        await sequelize.createSchema(process.env.SCHEMA);
    }
});
