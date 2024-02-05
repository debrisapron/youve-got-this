import * as rn from "react-native"

function getRecency(d) {
  if (d === 0) {
    return "Last done today"
  }
  if (d === 1) {
    return "Last done yesterday"
  }
  return `Last done ${d} days ago`
}

function getPunctuality(od) {
  if (od === 0) {
    return "Due today"
  }
  if (od === 1) {
    return "1 day overdue"
  }
  if (od > 1) {
    return `${od} days overdue`
  }
  if (od === -1) {
    return "Due tomorrow"
  }
  return `Due in ${-od} days`
}

function TaskStatusReadout({ task }) {
  return (
    <rn.Text style={st.statusInfo}>
      {getRecency(task.daysSinceLastDone)}
      {"   |   "}
      {getPunctuality(task.overdueness)}
    </rn.Text>
  )
}

const st = rn.StyleSheet.create({
  statusInfo: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
    color: rn.PlatformColor("systemGray"),
  },
})

export default TaskStatusReadout
