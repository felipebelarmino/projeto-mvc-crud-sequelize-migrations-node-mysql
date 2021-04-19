module.exports = {
  database: "projeto-login-db",
  username: "root",
  password: "@12345678#",
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamp: true, // Mostra createdAt...
    underscored: true, //Padronização de tabelas e colunas
    underscoredAll: true, //Padronização de tabelas e colunas
  },
};
