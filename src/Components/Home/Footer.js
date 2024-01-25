import * as rn from "react-native"
import * as rne from "react-native-elements"

import * as utils from "../../utils.js"

function getTasksReadout(tasks) {
  const count = tasks.length
  if (count === 0) {
    return "No tasks yet! Add one with this --->"
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

  return (
    <rn.View style={st.footer}>
      <rn.Text style={st.tasksReadout}>{tasksReadout}</rn.Text>

      <rne.FAB
        icon={{ name: "add", color: "white" }}
        color={rn.PlatformColor("systemBlue")}
        style={st.addButton}
        onPress={onRequestAddTask}
      />
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    height: 100,
    borderTopWidth: 0.2,
    borderTopColor: rn.PlatformColor("systemGray"),
  },
  addButton: {
    position: "relative",
    top: -2,
    marginRight: 20,
  },
  tasksReadout: {
    marginTop: 24,
    position: "relative",
    fontSize: 18,
    fontStyle: "italic",
    marginLeft: 20,
    color: rn.PlatformColor("label"),
  },
})

export default Footer
