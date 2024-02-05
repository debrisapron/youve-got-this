import * as rn from "react-native"

import FullWidthButton from "./FullWidthButton"

function DeleteTaskButton({ onDeleteTask }) {
  return (
    <FullWidthButton
      title="Delete Task"
      color={rn.PlatformColor("systemRed")}
      onPress={() => {
        rn.Alert.alert(
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

export default DeleteTaskButton
