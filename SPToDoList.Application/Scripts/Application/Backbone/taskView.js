define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jquery.editable',
        'jquery.ui',
        'bootstrap'
    ],
    function ($, _, Backbone) {
        var TaskView = Backbone.View.extend({
            el: $("body"), //Set rendering container to <body>
            templateHtml: $("script.tasks-board-template").html(), //Set template
            initialize: function (tasksCollection) { //Set collection and bind events for it
                var that = this; //Context holder
                this.tasksCollection = tasksCollection; //Assigning collection
            },

            render: function () {
                var that = this;

                this.tasksCollection.fetch({
                    success: function (fetchedCollection) {
                        onCollectionFetched(fetchedCollection);
                    }
                });

                function onCollectionFetched(fetchedCollection) {
                    var tasksArray = fetchedCollection.toArray();

                    //++Filling page with content
                    var content = _.template(that.templateHtml, {
                        tasks: tasksArray
                    });
                    that.$el.html(content);
                    //--Filling page with content

                    //++Making tasks content editable
                    that.$("div.content").editable({
                        callback: function (elementData) {
                            //Get edited task ID
                            var taskId = elementData.$el.parent().attr("task-id");
                            //Get task from collection by id
                            var task = fetchedCollection.get(taskId);
                            //Get element content (text edited)
                            var content = elementData.content;
                            //Set modified text to item
                            task.set("Content", content);
                            //Update item on server
                            fetchedCollection.serverUpdate(task);
                        }
                    });
                    //--Making tasks content editable

                    //++Event fired on task adding
                    $('button#buttonAddNewTask').click(function () {
                        //Retrieve value
                        var taskDescription = $('#inputTaskDescription').val();
                        if (taskDescription) { //If present
                            that.tasksCollection.serverInsert({
                                Id: null, //Insertion needs no ID
                                Content: taskDescription, //From input
                                TaskStateAlphaId: 'todo' //Queued in "To do"
                            }, that);
                        }
                    });
                    //--Event fired on task adding

                    //++Event fired on taks removal
                    $('div.remove-handler').click(function (elementData) {
                        //Get task ID
                        var taskId = $(this).parent().attr("task-id");
                        //Get task from collection by id
                        var task = fetchedCollection.get(taskId);
                        //Delete item from server
                        fetchedCollection.serverDelete(task);
                    });
                    //--Event fired on taks removal

                    $("div.draggable").draggable({
                        handle: ".drag-handler"
                    });

                    $("div.droppable").droppable({
                        //hoverClass: "tdHover",
                        drop: function (event, ui) {
                            var taskId = ui.draggable.attr('task-id');
                            var divId = event.target.id;
                            var task = fetchedCollection.get(taskId);
                            switch (divId) {
                                case 'divToDo':
                                    task.set('TaskStateAlphaId', 'todo');
                                    break;
                                case 'divInProgress':
                                    task.set('TaskStateAlphaId', 'inprogress');
                                    break;
                                case 'divDone':
                                    task.set('TaskStateAlphaId', 'done');
                                    break;
                                default:
                                    break;
                            }
                            ui.draggable.detach().css({ top: 0, left: 0 });
                            $(this).append(ui.draggable);
                            //Update item on server
                            fetchedCollection.serverUpdate(task);
                        }
                    });
                }
                return this;
            }
        });
        return TaskView;
    });