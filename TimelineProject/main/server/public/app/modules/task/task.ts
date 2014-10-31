module APP_TASK {

	class Controller extends PageController {
		taskCollection: any;

		task: any;

		action = 'update'; // update - create

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);

			this.loadProfile(() => {
				this.pageDescription = 'Configurate your task!';
				this.pageTitle = 'Task settings';

				this.isPageReady = true;

				this.taskCollection = this.Restangular.all('tasks');

				var id = this.$routeParams.id;
				if (id === 'create') {
					this.action = 'create';
					this.task = {
						_created: '',
						_updated: '',
						title: '',
						description: '',
						section: '',
						status: 'progress',
						tasks: [],
						userId: this.Context.user._id
					};
					this.isPageBusy = false;
				}
				else {
					this.action = 'update';
					this.taskCollection.get(id).then(
						(data) => {
							this.task = data;
							this.task.tasks = this.task.tasks || [];
							this.isPageBusy = false;
						});
				}
			});
		}

		createTask() {
			this.taskCollection.post(this.task).then(
				(result) => {
					this.task = result;
					this.show.success('Success');
				},
				(error) => {
					this.onError(error)
				});
		}

		updateTask() {
			this.task.save().then(
				(result) => {
					this.show.success('Success');
				},
				(error) => {
					this.onError(error)
				});
		}

		deleteTask() {
			this.task.remove().then(
				(result) => {
					this.show.success('Success');
					this.$location.path('/dashboard');
				},
				(error) => {
					this.onError(error)
				});
		}
	}

	angular
		.module('app.modals')
		.controller('taskCtrl', Controller);
}