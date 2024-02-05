import * as rn from "react-native"

import FullWidthButton from "./FullWidthButton"

function CreateTaskButton({ disabled, onCreateTask }) {
  return (
    <FullWidthButton
      title="Create Task"
      color={rn.PlatformColor("systemBlue")}
      onPress={onCreateTask}
      disabled={disabled}
    />
  )
}

export default CreateTaskButton
