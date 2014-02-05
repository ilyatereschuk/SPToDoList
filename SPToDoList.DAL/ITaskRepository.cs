using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SPToDoList.DAL
{
    public interface ITaskRepository
    {
        IEnumerable<Task> Select();
        void Update(Task task);
        void Insert(Task task);
        void Delete(Task task);

        String AlphaIdToDo          { get; }
        String AlphaIdInProgress    { get; }
        String AlphaIdDone          { get; }
    }
}
