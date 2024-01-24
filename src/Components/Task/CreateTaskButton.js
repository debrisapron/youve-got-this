import { PlatformColor, StyleSheet } from "react-native"
import { Button } from "react-native-elements"

function CreateTaskButton({ disabled, onCreateTask }) {
  return (
    <Button
      title="Create Task"
      titleStyle={st.createButtonTitle}
      buttonStyle={st.createButton}
      onPress={onCreateTask}
      disabled={disabled}
    />
  )
}

const st = StyleSheet.create({
  createButton: {
    backgroundColor: "lightgray",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  },
  createButtonTitle: {
    fontWeight: "700",
    color: PlatformColor("systemBlue"),
  },
})

export default CreateTaskButton
