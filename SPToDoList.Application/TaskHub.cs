using System;
using System.Web;
using Microsoft.AspNet.SignalR;
namespace SignalRChat
{
public class TaskHub : Hub
{
    public void Send()
    {
        Clients.All.broadcastMessage();
    }
}
}