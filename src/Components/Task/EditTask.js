import SectionHeader from "../SectionHeader.js"
import TaskDetail from "./TaskDetail.js"
import FullWidthButton from "./FullWidthButton"
import DeleteTaskButton from "./DeleteTaskButton.js"
import TaskStatusReadout from "./TaskStatusReadout.js"

function EditTask({
  task,
  onChangeTaskName,
  onDeleteTask,
  onSelectInterval,
  onDismissTask,
}) {
  return (
    <>
      <TaskStatusReadout task={task} />

      <SectionHeader />
      <SectionHeader title="Edit details" />
      <TaskDetail
        task={task}
        onChangeTaskName={onChangeTaskName}
        onSelectInterval={onSelectInterval}
      />

      <SectionHeader />
      <SectionHeader />
      <FullWidthButton
        title="Set Task Done"
        color="#0C0"
        onPress={onDismissTask}
      />

      <SectionHeader />
      <SectionHeader />
      <DeleteTaskButton onDeleteTask={onDeleteTask} />
    </>
  )
}

export default EditTask
