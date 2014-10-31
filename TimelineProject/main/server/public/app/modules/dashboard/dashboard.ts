module APP_DASHBOARD {

	class Controller extends PageController {

		pageTitle = 'Dashboard';
		pageDescription = 'all project in one place'

		taskRepository: any;

		taskList: Array<ITask>;
		task: any;

		state = 'list'; // list-update-create

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);

			this.loadProfile(() => {
				this.isPageReady = true;

				this.taskRepository = this.Restangular.all('tasks');

				this.initPage();
			});
		}

		initPage() {
			this.taskRepository.getList().then(
				(collection) => {
					this.taskList = collection;
					this.isPageBusy = false;
				},
				(error) => this.onError(error));
		}

		switchState(state: string, task) {
			this.state = state;

			if (state === 'list') {
				this.task = null;
			}
			else if (state === 'update') {
				this.task = task;
			}
			else if (state === 'create') {
				this.task = {
					_created: '',
					_updated: '',
					title: '',
					description: '',
					section: '',
					status: 'progress',
					relations: [],
					userId: this.Context.user._id
				};
			}
			else {
				this.show.error('Error');
			}
		}

		chain(task) {
			var elm = _.find(this.task.relations, (t: any) => {
				return t === task._id;
			});
			if (!elm) {
				this.task.relations.push(task._id);
				task.relations.push(this.task._id);
			}
		}

		setStatus(status: string, task) {
			task.status = status;
			task.save().then(
				(result) => {
					this.show.success('Success');
				},
				(error) => this.onError(error));
		}

		updateTask() {
			this.task.save().then(
				(result) => {
					var index = -1;
					_.each(this.taskList, (t, ind) => {
						if (t._id === this.task._id) index = ind;
					});

					if (index !== -1) {
						this.taskList[index] = this.task;
						this.task = null;
						this.state = 'list';
						this.show.success('Success');
					}
				},
				(error) => this.onError(error));
		}

		createTask() {
			this.taskRepository.post(this.task).then(
				(data) => {
					this.taskList.splice(0, 0, data);
					this.task = null;
					this.state = 'list';
					this.show.success('Success');
				},
				(error) => this.onError(error));
		}

		deleteTask() {
			this.task.remove().then(
				(result) => {
					var index = -1;
					_.each(this.taskList, (t, ind) => {
						if (t._id === this.task._id) index = ind;
					});

					if (index !== -1) {
						this.taskList.splice(index, 1);
						this.task = null;
						this.state = 'list';
						this.show.success('Success');
					}
				},
				(error) => {
					this.onError(error)
				});
		}
	}

	angular
		.module('app.modules')
		.controller('dashboardCtrl', Controller);
}