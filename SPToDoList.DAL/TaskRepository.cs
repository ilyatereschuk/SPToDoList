using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SPToDoList.DAL
{
    public class TaskRepository : ITaskRepository
    {
        private ToDoListDBEntities _dbEntities;

        public TaskRepository()
        {
            _dbEntities = new ToDoListDBEntities();
        }

        #region ITaskRepository

        public IEnumerable<Task> Select()
        {
            return _dbEntities.Tasks;
        }

        public void Update(Task task)
        {
            ApplyTaskState(task, EntityState.Modified);
        }

        public void Insert(Task task)
        {
            ApplyTaskState(task, EntityState.Added);
        }

        public void Delete(Task task)
        {
            ApplyTaskState(task, EntityState.Deleted);
        }

        public string AlphaIdToDo
        {
            get { return "todo"; }
        }

        public string AlphaIdInProgress
        {
            get { return "inprogress"; }
        }

        public string AlphaIdDone
        {
            get { return "done"; }
        }

        #endregion ITaskRepository

        private void ApplyTaskState(Task task, EntityState state)
        {
            _dbEntities.Tasks.Attach(task);
            var entry = _dbEntities.Entry(task);
            entry.State = state;
            _dbEntities.SaveChanges();
        }
    }
}
