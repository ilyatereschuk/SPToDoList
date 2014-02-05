require(
    [
        'jquery',
        'taskCollection',
        'taskView',
        'jquery.signalR',
        'signalRHubs',
    ],
    function ($, Tasks, TaskView) {
        //Instantiate hub
        var taskHub = $.connection.taskHub;
        //Pass it to collection
        var tasksCollection = new Tasks(taskHub);
        //Create a view with collection passed
        var taskView = new TaskView(tasksCollection);
        //Set render on message income
        taskHub.client.broadcastMessage = function () {
            taskView.render();
        };
        //Start connection and render when ready
        $.connection.hub.start().done(function () {
            taskView.render();
        });
    }
);
