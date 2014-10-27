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

		editTask(id: string) {
			var modalInstance = this.$modal.open({
				templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
				controller: 'modalEditTask',
				controllerAs: 'modalCtrl',
				resolve: {
					data: () => {
						var elm = _.find(this.tasks, (t) => t._id === id);
						return angular.copy(elm);
					}
				}
			});

			modalInstance.result.then(
				(task) => {
					var index = null;
					_.find(this.tasks, (t, i) => {
						if (t._id === task._id) {
							index = i;
							return true;
						}
						return false;
					});

					task.save().then(
						(result) => {
							this.tasks[index] = task;
							this.show.success('Update complete!', 'DEBUG');
						});
				});
		}

		addTask() {
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
					this.tasks.push(data);

					this.taskCollection.post(data).then(
						(result) => {
							console.log(result);
						});
				});
		}
	}

	angular
		.module('app.modules')
		.controller('dashboardCtrl', Controller);
}