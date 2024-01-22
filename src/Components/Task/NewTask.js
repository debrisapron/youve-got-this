import SectionHeader from "../SectionHeader.js"
import TaskDetail from "./TaskDetail.js"

//, onConfirmAddTask

function NewTask({ task, onChangeTaskName }) {
  return (
    <>
      <TaskDetail task={task} onChangeTaskName={onChangeTaskName} />
      <SectionHeader />
    </>
  )
}

export default NewTask
