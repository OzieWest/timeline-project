module APP_MODAL_EDIT_PROJECT {

	class Controller extends BaseController {
		task: any;
		$modalInstance: any;

		static $inject = ['$injector', '$modalInstance', 'data'];
		constructor($injector, $modalInstance, data) {
			super($injector);

			this.task = data;
			this.$modalInstance = $modalInstance;
		}

		saveChanges() {
			this.$modalInstance.close(this.task);
		}

		close() {
			this.$modalInstance.dismiss('cancel');
		}
	}

	angular
		.module('app.modals')
		.controller('modalEditTask', Controller);
}