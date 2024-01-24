import * as rn from "react-native"

function TaskListEmptyState() {
  return (
    <rn.View style={st.container}>
      <rn.Text>Nobody's home</rn.Text>
      <rn.Text style={st.shruggie}>¯\_(ツ)_/¯</rn.Text>
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shruggie: {
    position: "relative",
    top: -100,
    fontFamily: "Menlo",
    fontSize: 40,
  },
})

export default TaskListEmptyState
