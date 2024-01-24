import SectionHeader from "../SectionHeader.js"
import TaskDetail from "./TaskDetail.js"
import DeleteTaskButton from "./DeleteTaskButton.js"

function EditTask({ task, onChangeTaskName, onDeleteTask, onSelectInterval }) {
  return (
    <>
      <SectionHeader />
      <TaskDetail
        task={task}
        onChangeTaskName={onChangeTaskName}
        onSelectInterval={onSelectInterval}
      />
      <SectionHeader />
      <DeleteTaskButton onDeleteTask={onDeleteTask} />
    </>
  )
}

export default EditTask
