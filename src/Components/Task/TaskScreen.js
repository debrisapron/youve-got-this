import * as rn from "react-native"
import * as rnav from "@react-navigation/native"
import * as store from "../../store/store.js"

import EditTask from "./EditTask.js"
import NewTask from "./NewTask.js"

function TaskScreen({ route }) {
  const { taskId } = route.params
  const isNewTask = taskId === "new"
  const navigation = rnav.useNavigation()
  const task = store.useStore((state) => state.tasks[taskId])
  const createTask = store.useStore((state) => state.createTask)
  const setTaskName = store.useStore((state) => state.setTaskName)
  const setTaskInterval = store.useStore((state) => state.setTaskInterval)
  const deleteTask = store.useStore((state) => state.deleteTask)
  const dismissTask = store.useStore((state) => state.dismissTask)

  function onDismissTask() {
    dismissTask(taskId)
  }

  function onCreateTask() {
    createTask()
    navigation.goBack()
  }

  function onSelectInterval(days) {
    setTaskInterval(taskId, days)
  }

  function onDeleteTask() {
    deleteTask(taskId)
    navigation.goBack()
  }

  function onChangeTaskName(name) {
    setTaskName(taskId, name)
  }

  if (!task) {
    return null
  }

  return (
    <rn.View style={st.container}>
      <rn.SafeAreaView>
        {isNewTask ? (
          <NewTask
            task={task}
            onChangeTaskName={onChangeTaskName}
            onSelectInterval={onSelectInterval}
            onCreateTask={onCreateTask}
          />
        ) : (
          <EditTask
            task={task}
            onChangeTaskName={onChangeTaskName}
            onDeleteTask={onDeleteTask}
            onSelectInterval={onSelectInterval}
            onDismissTask={onDismissTask}
          />
        )}
      </rn.SafeAreaView>
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
  },
})

export default TaskScreen
