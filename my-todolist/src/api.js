import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
  headers: { "API-KEY": "6d256147-ebe3-4533-9cde-74c76ea0f542" }
});

const api = {
  createTask(title) {
    return instance.post('', { title });
  },
  createTodolist(newText, id) {
    return instance.post(`${id}/tasks`, { title: newText });
  },
  restoreStateTodolist(){
    return instance.get('');
  },
  restoreStateTasks(id) {
    return instance.get(`${id}/tasks`);
  },
  changeTask(object, id, taskId) {
    return instance.put(`${id}/tasks/${taskId}`, object);
  },
  deleteTodolist(id) {
    return instance.delete(`${id}`);
  },
  deleteTask(todolistId, taskId) {
    return instance.delete(`${todolistId}/tasks/${taskId}`);
  }

}

export default api;