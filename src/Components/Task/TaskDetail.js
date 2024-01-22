import * as rn from "react-native"
import * as rne from "react-native-elements"
import SectionHeader from "../SectionHeader"

function TaskDetail({ task, onChangeTaskName, onOpenIntervals }) {
  return (
    <>
      <SectionHeader />
      <SectionHeader title="Details" />
      <rne.ListItem bottomDivider containerStyle={st.firstItem}>
        <rne.ListItem.Title style={st.label}>Description</rne.ListItem.Title>
        <rne.ListItem.Content>
          <rne.ListItem.Input
            placeholder="Type a short task name"
            value={task.name}
            onChangeText={onChangeTaskName}
          />
        </rne.ListItem.Content>
      </rne.ListItem>
      <rne.ListItem containerStyle={st.lastItem} onPress={onOpenIntervals}>
        <rne.ListItem.Content>
          <rne.ListItem.Title style={st.label}>Schedule</rne.ListItem.Title>
        </rne.ListItem.Content>
        <rne.ListItem.Content right>
          <rn.Text style={st.intervalsReadout}>{task.intervalInWords}</rn.Text>
        </rne.ListItem.Content>
        <rne.ListItem.Chevron color="black" />
      </rne.ListItem>
    </>
  )
}

const st = rn.StyleSheet.create({
  firstItem: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  lastItem: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: 700,
  },
  intervalsReadout: {
    fontSize: 18,
    width: 200,
    textAlign: "right",
  },
})

export default TaskDetail
