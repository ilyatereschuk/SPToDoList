define(
    [
        'jquery',
        'backbone',
        'taskModel'
    ],
    function ($, Backbone, Task) {
        var Tasks = Backbone.Collection.extend({
            model: Task,
            url: "api/Tasks/Select",

            initialize: function (signalrHub) {
                this.signalrHub = signalrHub;
            },

            serverInsert: function (task) { //Insert on server and update collection
                var that = this;
                $.ajax({
                    type: "POST",
                    url: "api/Tasks/Insert",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(task),
                    success: function (result) {
                        that.add(task);
                        that.signalrHub.server.send();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Insert error!')
                    }
                });
            },

            serverUpdate: function (task) { //Update changed item on server
                var that = this;
                $.ajax({
                    type: "PUT",
                    url: "api/Tasks/Update",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(task),
                    success: function (result) {
                        that.signalrHub.server.send();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Update error!')
                    }
                });
            },

            serverDelete: function (task) { //Delete item on server
                var that = this;
                $.ajax({
                    type: "DELETE",
                    url: "api/Tasks/Delete",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(task),
                    success: function (result) {
                        that.remove(task);
                        that.signalrHub.server.send();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Delete error!')
                    }
                });
            }
        });
        return Tasks;
    });
