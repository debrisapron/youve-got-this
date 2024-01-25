import * as react from "react"
import * as rn from "react-native"
import * as rne from "react-native-elements"

import TaskListItem from "./TaskListItem.js"

function TaskListSection({
  collapsible,
  tasks,
  title,
  onLayout,
  onRequestEditTask,
  onRequestDismissTask,
}) {
  const defaultExpanded = !collapsible
  const [expanded, setExpanded] = react.useState(defaultExpanded)

  function renderItem({ item: task, index }) {
    return (
      <TaskListItem
        task={task}
        isFirst={index === 0}
        isLast={index === tasks.length - 1}
        onRequestEditTask={() => onRequestEditTask(task.id)}
        onRequestDismissTask={() => onRequestDismissTask(task.id)}
      />
    )
  }

  return (
    <rne.ListItem.Accordion
      containerStyle={st.listItemContainer}
      bottomDivider={expanded}
      content={
        <rne.ListItem.Content>
          <rn.Text style={st.sectionHeader}>{title}</rn.Text>
        </rne.ListItem.Content>
      }
      noIcon={!collapsible}
      isExpanded={expanded}
      onPress={() => collapsible && setExpanded((x) => !x)}
      onLayout={onLayout}
    >
      <rn.FlatList
        data={tasks}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </rne.ListItem.Accordion>
  )
}

const st = rn.StyleSheet.create({
  listItemContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#00000000",
    padding: 0,
    paddingRight: 5,
    margin: 0,
  },
  sectionHeader: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    padding: 10,
    width: "1fr",
  },
})

export default TaskListSection
