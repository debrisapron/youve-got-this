import * as rn from "react-native"
import * as rnav from "@react-navigation/native"
import * as store from "../../store.js"

import EditTask from "./EditTask.js"
import NewTask from "./NewTask.js"

function TaskScreen({ route }) {
  const { taskId } = route.params
  const isNewTask = taskId === "new"
  const navigation = rnav.useNavigation()
  const task = store.useStore((state) => state.tasks[taskId])
  const setTaskName = store.useStore((state) => state.setTaskName)
  const deleteTask = store.useStore((state) => state.deleteTask)

  function onOpenIntervals() {
    navigation.navigate("Intervals", { taskId })
  }

  function onDeleteTask() {
    deleteTask(taskId)
    navigation.goBack()
  }

  function onChangeTaskName(name) {
    setTaskName(taskId, name)
  }

  return (
    <rn.View style={st.container}>
      <rn.SafeAreaView>
        {isNewTask ? (
          <NewTask
            task={task}
            onChangeTaskName={onChangeTaskName}
            onOpenIntervals={onOpenIntervals}
          />
        ) : (
          <EditTask
            task={task}
            onChangeTaskName={onChangeTaskName}
            onDeleteTask={onDeleteTask}
            onOpenIntervals={onOpenIntervals}
          />
        )}
      </rn.SafeAreaView>
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
})

export default TaskScreen
