module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "",
  defines: { 
    timestamp: true,// Mostra createdAt...
    underscored: true,//Padronização de tabelas e colunas
    underscoredAll: true,//Padronização de tabelas e colunas
  }
};
