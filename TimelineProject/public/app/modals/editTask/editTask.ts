module APP_MODAL_EDIT_PROJECT {

	class Controller extends PageController {
		taskCollection: any;

		task: any;
		$modalInstance: any;

		action = 'update'; // update - create

		static $inject = ['$injector', '$modalInstance', 'data'];
		constructor($injector, $modalInstance, data) {
			super($injector);

			this.loadProfile(() => {
				this.taskCollection = this.Restangular.all('tasks');
				this.$modalInstance = $modalInstance;

				this.action = data._id ? 'update' : 'create';

				this.task = data;
			});
		}

		createTask() {
			this.taskCollection.post(this.task).then(
				(result) => {
					this.$modalInstance.close(result);
				},
				(error) => {
					this.close();
					this.onError(error)
				});
		}

		updateTask() {
			this.task.save().then(
				(result) => {
					this.$modalInstance.close(this.task);
				},
				(error) => {
					this.close();
					this.onError(error)
				});
		}

		deleteTask() {
			this.task.remove().then(
				(result) => {
					this.$modalInstance.close(result);
				},
				(error) => {
					this.close();
					this.onError(error)
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