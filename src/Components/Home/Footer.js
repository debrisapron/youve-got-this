import { PlatformColor, View, StyleSheet, Text } from "react-native"
import { FAB } from "react-native-elements"

import * as utils from "../../utils.js"

function getTasksReadout(tasks) {
  const count = tasks.length
  if (count === 0) {
    return "No tasks yet!"
  }
  const readout = `${count} task${utils.pluralS(count)}`
  const overdueCount = tasks.filter((task) => task.overdueness > 0).length
  if (overdueCount === 0) {
    return readout
  }
  return `${readout}, ${overdueCount} overdue`
}

function Footer({ tasksList, onRequestAddTask }) {
  const tasksReadout = getTasksReadout(tasksList)

  // {/* <Icon
  //   type="ionicon"
  //   name="home"
  //   iconProps={{ size: 36 }}
  //   style={st.homeButton}
  // /> */}
  // {/* <Icon
  //   type="ionicon"
  //   name="add-circle"
  //   iconProps={{ size: 40 }}
  //   style={st.addButton}
  // /> */}

  return (
    <View style={st.footer}>
      <Text style={st.tasksReadout}>{tasksReadout}</Text>

      <FAB
        icon={{ name: "add", color: "white" }}
        color={PlatformColor("systemBlue")}
        style={st.addButton}
        onPress={onRequestAddTask}
      />
    </View>
  )
}

const st = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    height: 100,
  },
  // homeButton: {
  //   marginTop: 5,
  //   marginLeft: 20,
  // },
  addButton: {
    position: "relative",
    top: -2,
    marginRight: 20,
  },
  tasksReadout: {
    marginTop: 22,
    position: "relative",
    fontSize: 18,
    // fontWeight: "bold",
    fontStyle: "italic",
    marginLeft: 20,
    color: PlatformColor("label"),
  },
})

export default Footer
