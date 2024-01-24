import SectionHeader from "../SectionHeader.js"
import TaskDetail from "./TaskDetail.js"
import CreateTaskButton from "./CreateTaskButton.js"

function NewTask({ task, onChangeTaskName, onSelectInterval, onCreateTask }) {
  return (
    <>
      <SectionHeader />
      <TaskDetail
        task={task}
        onChangeTaskName={onChangeTaskName}
        onSelectInterval={onSelectInterval}
      />
      <SectionHeader />
      <CreateTaskButton
        disabled={!task?.name?.trim()}
        onCreateTask={onCreateTask}
      />
    </>
  )
}

export default NewTask
