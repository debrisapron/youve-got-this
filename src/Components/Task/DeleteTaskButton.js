import { Alert, PlatformColor, StyleSheet } from "react-native"
import { Button } from "react-native-elements"

function DeleteTaskButton({ onDeleteTask }) {
  return (
    <Button
      title="Delete Task"
      titleStyle={st.deleteButtonTitle}
      buttonStyle={st.deleteButton}
      onPress={() => {
        Alert.alert(
          "Delete Task?",
          "This task will be permanently deleted from your tasks list.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: onDeleteTask,
              style: "destructive",
            },
          ]
        )
      }}
    />
  )
}

const st = StyleSheet.create({
  deleteButton: {
    backgroundColor: "lightgray",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  },
  deleteButtonTitle: {
    fontWeight: "700",
    color: PlatformColor("systemRed"),
  },
})

export default DeleteTaskButton
