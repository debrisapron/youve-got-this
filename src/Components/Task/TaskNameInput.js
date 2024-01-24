import * as rn from "react-native"
import * as rne from "react-native-elements"

function TaskNameInput({ containerStyle, value, onChangeTaskName }) {
  return (
    <rne.ListItem bottomDivider containerStyle={containerStyle}>
      <rne.ListItem.Title style={st.label}>Description</rne.ListItem.Title>
      <rne.ListItem.Content>
        <rne.ListItem.Input
          placeholder="Type a short task name"
          value={value}
          onChangeText={onChangeTaskName}
        />
      </rne.ListItem.Content>
    </rne.ListItem>
  )
}

const st = rn.StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 700,
  },
})

export default TaskNameInput
