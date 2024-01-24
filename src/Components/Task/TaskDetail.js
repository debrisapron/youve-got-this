import * as rn from "react-native"

import SectionHeader from "../SectionHeader"
import TaskNameInput from "./TaskNameInput"
import IntervalsPicker from "./IntervalsPicker"

function TaskDetail({ task, onChangeTaskName, onSelectInterval }) {
  return (
    <>
      <SectionHeader title="Details" />

      <TaskNameInput
        containerStyle={st.firstItem}
        value={task.name}
        onChangeTaskName={onChangeTaskName}
      />

      <IntervalsPicker
        value={task.interval}
        onSelectInterval={onSelectInterval}
      />
    </>
  )
}

const st = rn.StyleSheet.create({
  firstItem: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
})

export default TaskDetail
