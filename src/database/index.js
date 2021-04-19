import Sequelize from 'sequelize';
import databaseConfig from '../config/database'; //importar credenciais
import User from '../app/models/User';

const models = [User];

class Database {
	constructor() {
		this.init();
}
	init() {
		this.connection = new Sequelize (databaseConfig); //aqui eu tenho a conexão com DB
		
		models.map( model => model.init(this.connection));
	}
}

export default new Database();