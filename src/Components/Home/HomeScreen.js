import * as rn from "react-native"
import * as rnav from "@react-navigation/native"
import * as store from "../../store.js"

import Footer from "./Footer.js"
import TaskList from "./TaskList.js"

function HomeScreen() {
  const navigation = rnav.useNavigation()
  const tasksList = store.useStore((state) => state.tasksList)
  const overdueTasks = store.useStore((state) => state.overdueTasksList)
  const dueTasks = store.useStore((state) => state.dueTasksList)
  const setTaskListSectionTitle = store.useStore(
    (state) => state.setTaskListSectionTitle
  )

  function onRequestAddTask() {
    navigation.navigate("Task", { taskId: "new" })
  }

  function onRequestEditTask(taskId) {
    navigation.navigate("Task", { taskId })
  }

  return (
    <>
      <rn.View style={st.container}>
        <TaskList
          overdueTasks={overdueTasks}
          dueTasks={dueTasks}
          onChangeActiveSectionTitle={setTaskListSectionTitle}
          onRequestEditTask={onRequestEditTask}
        />
      </rn.View>
      <Footer tasksList={tasksList} onRequestAddTask={onRequestAddTask} />
    </>
  )
}

const st = rn.StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
})

export default HomeScreen