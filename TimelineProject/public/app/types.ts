interface IBaseModel {
	_id: string;
	_created: string;
	_updated: string;
}

interface IUser extends IBaseModel {
	email: String;
	password: String;
	role: String;
}

interface ITask extends IBaseModel {
	userId: String;
	section: String;
	title: String;
	description: String;
	action: String;
	status: String;
}