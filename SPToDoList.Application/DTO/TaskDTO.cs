using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SPToDoList.Application.DTO
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string TaskStateAlphaId { get; set; }
    }
}