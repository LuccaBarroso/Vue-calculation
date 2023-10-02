import  { TodoStatus, type Todo} from "@/types"
import { reactive, computed } from "vue";

interface TodoStore {
  [TodoStatus.Pending]: Todo[];
  [TodoStatus.InProgress]: Todo[];
  [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
  [TodoStatus.Pending]: [
    {
      id: 1,
      title: "Learn Vuejs",
      description: "or die trying",
      status: TodoStatus.Pending
    },
  ],
  [TodoStatus.InProgress]: [],
  [TodoStatus.Completed]: []
}

const TodoStore = reactive<TodoStore>(defaultVal);

export default () => {
  const getTodoByStatus = (todoStatus: TodoStatus) => {
    // return  TodoStore[todoStatus];
    return  computed(() => TodoStore[todoStatus]);
  };

  return {
    getTodoByStatus
  }
}