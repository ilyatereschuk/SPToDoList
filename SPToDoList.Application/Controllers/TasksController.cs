using SPToDoList.Application.DTO;
using SPToDoList.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SPToDoList.Application.Controllers
{
public class TasksController : ApiController
{
    private readonly ITaskRepository _taskRepository;

    public TasksController()
    {
        _taskRepository = new TaskRepository();
    }

    [HttpGet]
    public IEnumerable<TaskDTO> Select()
    {
        var tasks = _taskRepository.Select();
        return tasks.Select(ToTaskDTO);
    }

    [HttpPut]
    public TaskDTO Update(TaskDTO taskDto)
    {
        Task task = ToTask(taskDto);
        _taskRepository.Update(task);
        return taskDto;
    }

    [HttpPost]
    public TaskDTO Insert(TaskDTO taskDto)
    {
        Task task = ToTask(taskDto);
        _taskRepository.Insert(task);
        return taskDto;
    }

    [HttpDelete]
    public TaskDTO Delete(TaskDTO taskDto)
    {
        Task task = ToTask(taskDto);
        _taskRepository.Delete(task);
        return taskDto;
    }

    private TaskDTO ToTaskDTO(Task task)
    {
        return new TaskDTO
        {
            Id = task.ID,
            Content = task.CONTENT,
            TaskStateAlphaId = task.TASKSTATEALPHAID
        };
    }

    private Task ToTask(TaskDTO taskDto)
    {
        return new Task
        {
            ID = taskDto.Id,
            CONTENT = taskDto.Content,
            TASKSTATEALPHAID = taskDto.TaskStateAlphaId
        };
    }
}
}