module APP_DASHBOARD {

	class Controller extends BaseController {

		pageTitle = 'Timeline';
		pageDescription = 'all project in one place'

		tasks: Array<ITask>;

		taskCollection: any;

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);

			this.taskCollection = this.Restangular.all('544e179dad83406df93f98ec/tasks');

			this.initPage();
		}

		initPage() {
			// v0/544e179dad83406df93f98ec/tasks/544e38c89738e46847191550

			this.taskCollection.getList().then(
				(collection) => {
					this.tasks = collection;
					console.log(collection);
				});
		}

		updateTask(oldTask) {
			var modalInstance = this.$modal.open({
				templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
				controller: 'modalEditTask',
				controllerAs: 'modalCtrl',
				resolve: {
					data: () => {
						return angular.copy(oldTask);
					}
				}
			});

			modalInstance.result.then(
				(newTask) => {
					if (typeof newTask === 'object') {
						var index = null;
						_.find(this.tasks, (t, i) => {
							if (t._id === newTask._id) {
								index = i;
								return true;
							}
							return false;
						});

						this.tasks[index] = newTask;
						this.show.success('Update complete!', 'DEBUG');
					}
					else if(typeof newTask === 'string') {
						var index = null;
						_.find(this.tasks, (t, i) => {
							if (t._id === oldTask._id) {
								index = i;
								return true;
							}
							return false;
						});

						this.tasks.splice(index, 1);
						this.show.success('Delete complete!', 'DEBUG');
					}
				});
		}

		createTask() {
			var modalInstance = this.$modal.open({
				templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
				controller: 'modalEditTask',
				controllerAs: 'modalCtrl',
				resolve: {
					data: () => {
						return {
							status: 'progress',
							_created: new Date()
						};
					}
				}
			});

			modalInstance.result.then(
				(data) => {
					this.tasks.splice(0, 0, data);
					this.show.success('OK', 'DEBUG');
				});
		}
	}

	angular
		.module('app.modules')
		.controller('dashboardCtrl', Controller);
}