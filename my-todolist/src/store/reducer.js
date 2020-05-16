const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
const DELETE_TODOLIST = 'Todolist/Reducer/DELETE-TODOLIST';
const DELETE_TASK = 'Todolist/Reducer/DELETE-TASK';
const ADD_TASK = 'Todolist/Reducer/ADD-TASK';
const UPDATE_TASK = 'Todolist/Reducer/UPDATE-TASK';
const SET_TODOLISTS = 'Todolist/Reducer/SET-TODOLISTS';
const SET_TASKS = 'Todolist/Reducer/SET-TASKS';


const initialState = {
  "todolists": []
  // [{
  //   "id": 0, "title": "every day", tasks: [
  //     { "title": "css11", "isDone": false, "priority": "low", "id": 0 },
  //     { "title": "js", "isDone": false, "priority": "low", "id": 1 },
  //     { "title": "react", "isDone": false, "priority": "low", "id": 2 },
  //     { "title": "sasasa", "isDone": false, "priority": "low", "id": 3 },
  //     { "title": "yoaa", "isDone": false, "priority": "low", "id": 4 },
  //     { "title": "sddsdsds", "isDone": false, "priority": "low", "id": 5 }]
  // },
  // { "id": 1, "title": "tomorrow", tasks: [{ "title": "css11", "isDone": false, "priority": "low", "id": 0 },] },
  // { "id": 2, "title": "weewwe`", tasks: [{ "title": "css11", "isDone": false, "priority": "low", "id": 0 },] },
  // { "id": 3, "title": "dddd", tasks: [{ "title": "css11", "isDone": false, "priority": "low", "id": 0 },] }
  // ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODOLIST:
      return {
        ...state,
        todolists: [...state.todolists, action.newTodolist]
      }
    case DELETE_TODOLIST:
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id != action.todolistId)
      }
    case DELETE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.filter(t => t.id != action.taskId)
            }
          } else {
            return tl
          }
        })
      }
    case ADD_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return { ...tl, tasks: [...tl.tasks, action.newTask] }
          } else {
            return tl
          }
        })
      }
    case UPDATE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.map(t => {
                if (t.id != action.taskId) {
                  return t;
                } else { 
                  if(action.value === 2){
                    return { ...t, 'status': true };
                  }
                  else if(action.value === 0) { 
                    return {...t, 'status': false };
                  }
                  else {
                    return { ...t, ...action.value };
                  }
                }
              })
            }
          } else {
            return tl
          }
        })
      }
    case SET_TODOLISTS:
      return {
        ...state,
        todolists: action.todolist.map(tl => ({ ...tl, tasks: [] }))
      }
    case SET_TASKS:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todoListId) {
            return { ...tl, tasks: [ ...action.allTasks] }
          } else {
            return tl
          }
        })
      }
  }
  console.log("reducer: ", action);
  return state;
}

export const addTodolistAC = (newTodolist) => ({ type: ADD_TODOLIST, newTodolist })
export const deleteTodolistAC = (todolistId) => ({ type: DELETE_TODOLIST, todolistId })
export const deleteTaskAC = (taskId, todolistId) => ({ type: DELETE_TASK, taskId, todolistId })
export const addTaskAC = (newTask, todolistId) => ({ type: ADD_TASK, newTask, todolistId })
export const updateTaskAC = (taskId, value, todolistId) => ({ type: UPDATE_TASK, taskId, value, todolistId })
export const setTodolistsAC = (todolist) => ({ type: SET_TODOLISTS, todolist })
export const setTasksAC = (allTasks, todoListId) => ({ type: SET_TASKS, allTasks, todoListId })

export default reducer;

export let stateWindow = window.initialState;