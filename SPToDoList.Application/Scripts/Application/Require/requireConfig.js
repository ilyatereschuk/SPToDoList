require.config({
shim: {
    //++jQuery stuff
    'jquery': { exports: '$' },
    'jquery.editable': { deps: ['jquery'] },
    'jquery.ui': { deps: ['jquery'] },
    'jquery.signalR': { deps: ['jquery'] },
    //--jQuery stuff
    'underscore': { deps: ['jquery'], exports: '_' },
    'bootstrap': { deps: ['jquery'] },
    'signalRHubs': { deps: ['jquery', 'jquery.signalR'] },
    //++Backbone stuff
    'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
    'taskModel': { deps: ['backbone'], exports: 'Task' },
    'taskCollection': { deps: ['backbone', 'taskModel'], exports: 'Tasks' },
    'taskView': { deps: ['backbone'], exports: 'TaskView' }
    //--Backbone stuff
},
paths: {
    'noext': '/Scripts/Libraries/require/plugins/noext',
    //++jQuery stuff
    'jquery': '/Scripts/Libraries/jQuery/jquery-2.1.0',
    'jquery.editable': '/Scripts/Libraries/jQuery/plugins/jquery.editable.min',
    'jquery.ui': '/Scripts/Libraries/jQuery/ui/jquery-ui.min',
    'jquery.signalR': '/Scripts/Libraries/jQuery/signalr/jquery.signalR-2.0.2.min',
    //--jQuery stuff
    'underscore': '/Scripts/Libraries/Underscore/underscore',
    'bootstrap': '/Scripts/Libraries/Bootstrap/bootstrap.min',
    'signalRHubs': '/signalr/hubs?noext', //SignalR
    //++Backbone stuff
    'backbone': '/Scripts/Libraries/Backbone/backbone',
    'taskModel': '/Scripts/Application/Backbone/taskModel',
    'taskCollection': '/Scripts/Application/Backbone/taskCollection',
    'taskView': '/Scripts/Application/Backbone/taskView'
    //--Backbone stuff
}
});
