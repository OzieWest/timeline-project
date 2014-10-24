var taskStatus = {
	//open: () => { return 'open'; },
	progress: () => { return 'progress'; },
	success: () => { return 'success'; },
};

var tasks = [
	{ _id: '1', section: 'NodeJS', title: 'bower', description: 'bower', action: 'Inspect', date: new Date(), status: taskStatus.success() },
	{ _id: '2', section: 'NodeJS', title: 'supervisor', description: 'supervisor', action: 'Inspect', date: new Date(), status: taskStatus.progress() },
	{ _id: '3', section: 'NodeJS', title: 'node-inspector', description: 'node-inspector', action: 'Inspect', date: new Date(), status: taskStatus.progress() },
	{ _id: '4', section: 'NodeJS', title: 'mongoose', description: 'mongoose', action: 'Inspect', date: new Date(), status: taskStatus.progress() },
]

module APP_DASHBOARD {

	class Controller extends BaseController {

		pageTitle = 'Timeline';
		pageDescription = 'all project in one place'

		tasks = tasks;

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);

			this.initPage();
		}

		initPage() {
			this.loadTaskList().then(
				(result) => {
					this.tasks = result;
				});
		}

		// debug
		loadTaskList(): ng.IPromise<any> {
			var def = this.$q.defer();
			def.resolve(tasks);
			return def.promise;
		}

		editTask(id: string) {

			var modalInstance = this.$modal.open({
				templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
				controller: 'modalEditTask',
				controllerAs: 'modalCtrl',
				resolve: {
					data: () => {
						var task = _.find(this.tasks, (t) => t._id === id);
						return angular.copy(task);
					}
				}
			});

			modalInstance.result.then(
				(data) => {
					var index = null;
					var task = _.find(this.tasks, (t, i) => {
						if (t._id === data._id) {
							index = i;
							return true;
						}
						return false;
					});

					this.tasks[index] = data;

					// DB update!
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
							date: new Date()
						};
					}
				}
			});

			modalInstance.result.then(
				(data) => {
					this.tasks.push(data);

					// DB update!
				});
		}
	}

	angular
		.module('app.modules')
		.controller('dashboardCtrl', Controller);
}