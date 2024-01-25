import * as rn from "react-native"
import * as rne from "react-native-elements"

function getBadgeStatus(task) {
  const od = task.overdueness
  if (od >= 4) {
    return "error"
  }
  if (od === 3) {
    return "warning"
  }
  return null
}

function TaskListItem({
  task,
  isFirst,
  isLast,
  onRequestEditTask,
  onRequestDismissTask,
}) {
  const isDone = task.overdueness < 0
  let itemStyle = {}
  if (isFirst) {
    itemStyle = st.firstItem
  } else if (isLast) {
    itemStyle = st.lastItem
  }
  const badgeStatus = getBadgeStatus(task)

  return (
    <rne.ListItem
      bottomDivider={!isLast}
      containerStyle={itemStyle}
      onPress={onRequestEditTask}
    >
      {!isDone && (
        <rne.Icon
          type="ionicon"
          name="checkmark-sharp"
          reverse
          color="#0C0"
          iconProps={{ size: 40 }}
          onPress={onRequestDismissTask}
        />
      )}
      <rne.ListItem.Content>
        <rne.ListItem.Title style={[st.itemTitle, isDone && st.done]}>
          {task.name}
          {badgeStatus && (
            <>
              &nbsp;
              <rne.Badge
                value={task.overdueness}
                status={badgeStatus}
                textStyle={st.badge}
              />
            </>
          )}
        </rne.ListItem.Title>
        <rne.ListItem.Subtitle style={[st.itemSubtitle, isDone && st.done]}>
          {task.intervalInWords}
          {task.overdueness > task.interval && isFirst && (
            <rn.Text style={st.overdueWarning}>
              &nbsp;&nbsp;Do this first!
            </rn.Text>
          )}
        </rne.ListItem.Subtitle>
      </rne.ListItem.Content>
      <rne.ListItem.Chevron
        color={isDone ? rn.PlatformColor("systemGray") : "black"}
      />
    </rne.ListItem>
  )
}

const st = rn.StyleSheet.create({
  badge: {
    position: "relative",
    fontSize: 16,
    fontWeight: "bold",
    top: -0.9,
    left: -0.2,
  },
  firstItem: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  lastItem: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  itemTitle: { fontSize: 20, fontWeight: 700 },
  done: {
    color: rn.PlatformColor("systemGray"),
  },
  itemSubtitle: { fontSize: 16, marginTop: 5 },
  overdueWarning: { color: "red", fontStyle: "italic" },
})

export default TaskListItem
