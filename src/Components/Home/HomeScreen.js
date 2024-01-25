import * as rn from "react-native"
import * as rnav from "@react-navigation/native"
import * as store from "../../store/store.js"

import Footer from "./Footer.js"
import TaskList from "./TaskList.js"

function HomeScreen() {
  const navigation = rnav.useNavigation()
  const tasksList = store.useStore((state) => state.tasksList)
  const overdueTasks = store.useStore((state) => state.overdueTasksList)
  const dueTasks = store.useStore((state) => state.dueTasksList)
  const doneTasks = store.useStore((state) => state.doneTasksList)
  const setTaskListSectionTitle = store.useStore(
    (state) => state.setTaskListSectionTitle
  )
  const dismissTask = store.useStore((state) => state.dismissTask)

  function onRequestAddTask() {
    navigation.navigate("Task", { taskId: "new" })
  }

  function onRequestEditTask(taskId) {
    navigation.navigate("Task", { taskId })
  }

  function onRequestDismissTask(taskId) {
    dismissTask(taskId)
  }

  if (!tasksList) {
    return null
  }

  return (
    <>
      <rn.View style={st.container}>
        <rn.SafeAreaView>
          <TaskList
            overdueTasks={overdueTasks}
            dueTasks={dueTasks}
            doneTasks={doneTasks}
            onChangeActiveSectionTitle={setTaskListSectionTitle}
            onRequestEditTask={onRequestEditTask}
            onRequestDismissTask={onRequestDismissTask}
          />
        </rn.SafeAreaView>
      </rn.View>
      <Footer tasksList={tasksList} onRequestAddTask={onRequestAddTask} />
    </>
  )
}

const st = rn.StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
  },
})

export default HomeScreen
