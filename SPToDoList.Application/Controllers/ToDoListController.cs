using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SPToDoList.Application.Controllers
{
    public class ToDoListController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
