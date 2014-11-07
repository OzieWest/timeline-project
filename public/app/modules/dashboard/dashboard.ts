/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />

module APP_DASHBOARD {

    interface IExtendedTask extends ITask {
        expand: boolean;
    }

    class Controller extends PageController {

        pageTitle = 'Dashboard';
        pageDescription = 'all project in one place'

        taskRepository:any;

        taskList:Array<IExtendedTask>;

        openedTask:IExtendedTask;

        newTask:IExtendedTask;

        static $inject = ['$injector'];

        constructor($injector) {
            super($injector);

            this.loadProfile(() => {
                this.taskRepository = this.Restangular.all('tasks');

                this.initPage();
            });
        }

        initPage() {
            this.newTask = this.clearTask();

            this.taskRepository.getList().then(
                (collection) => {
                    this.taskList = collection;
                    _.each(this.taskList, (e) => {
                        e.expand = false;
                    });

                    this.isPageBusy = false;
                },
                (error) =>
                    this.onError(error));
        }

        clearTask():IExtendedTask {
            return {
                expand: false,
                message: '',
                status: 'progress'
            }
        }

        setStatus(status:string, task):void {
            task.status = status;
            task.save().then(
                (result) => {
                    this.show.success('Updated', 'Success');
                },
                (error) =>
                    this.onError(error));
        }

        expandTask(task):void {
            task.expand = !task.expand;

            if (task.expand) {
                if (this.openedTask && this.openedTask._id !== task._id && this.openedTask.expand) {
                    this.openedTask.expand = false;
                }
                this.openedTask = task;
            }
        }

        updateTask(task) {
            task.save().then(
                (result) => {
                    this.show.success('Updated', 'Success');
                    task.expand = false;
                },
                (error) =>
                    this.onError(error));
        }

        createTask() {
            this.taskRepository.post(this.newTask).then(
                (data) => {
                    this.taskList.splice(0, 0, data);
                    this.newTask = this.clearTask();
                    this.show.success('Created', 'Success');
                },
                (error) =>
                    this.onError(error));
        }

        deleteTask(task:IExtendedTask):void {
            task.remove().then(
                (result) => {
                    var index = -1;
                    _.each(this.taskList, (t, ind) => {
                        if (t._id === task._id)
                            index = ind;
                    });

                    if (index !== -1) {
                        this.taskList.splice(index, 1);
                        task = null;
                        this.show.success('Deleted', 'Success');
                    }
                },
                (error) =>
                    this.onError(error));
        }
    }

    angular
        .module('app.dashboard', [])
        .controller('dashboardCtrl', Controller);
}