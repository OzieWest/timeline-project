module APP_MODAL_EDIT_PROJECT {

	class Controller extends BaseController {
		taskCollection: any;

		task: any;
		$modalInstance: any;

		action = 'update'; // update - create

		static $inject = ['$injector', '$modalInstance', 'data'];
		constructor($injector, $modalInstance, data) {
			super($injector);

			this.taskCollection = this.Restangular.all('544e179dad83406df93f98ec/tasks');
			this.$modalInstance = $modalInstance;

			this.action = data._id ? 'update' : 'create';

			this.task = data;
		}

		createTask() {
			this.taskCollection.post(this.task).then(
				(result) => {
					this.$modalInstance.close(result);
				});
		}

		updateTask() {
			this.task.save().then(
				(result) => {
					this.$modalInstance.close(this.task);
				});
		}

		deleteTask() {
			this.task.remove().then(
				(result) => {
					this.$modalInstance.close(result);
				});
		}

		close() {
			this.$modalInstance.dismiss('cancel');
		}
	}

	angular
		.module('app.modals')
		.controller('modalEditTask', Controller);
}