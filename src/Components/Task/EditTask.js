import SectionHeader from "../SectionHeader.js"
import TaskDetail from "./TaskDetail.js"
import DeleteTaskButton from "./DeleteTaskButton.js"

function EditTask({ task, onChangeTaskName, onDeleteTask, onOpenIntervals }) {
  return (
    <>
      <TaskDetail
        task={task}
        onChangeTaskName={onChangeTaskName}
        onOpenIntervals={onOpenIntervals}
      />
      <SectionHeader />
      <DeleteTaskButton onDeleteTask={onDeleteTask} />
    </>
  )
}

export default EditTask
