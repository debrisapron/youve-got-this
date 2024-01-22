import { StyleSheet, Text, View } from "react-native"
import { Badge, Icon, ListItem } from "react-native-elements"

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

function TaskListItem({ task, isFirst, isLast, onLayout, onRequestEditTask }) {
  let itemStyle = {}
  if (isFirst) {
    itemStyle = st.firstItem
  } else if (isLast) {
    itemStyle = st.lastItem
  }
  const badgeStatus = getBadgeStatus(task)
  return (
    <ListItem
      bottomDivider={!isLast}
      containerStyle={itemStyle}
      onLayout={onLayout}
      onPress={onRequestEditTask}
    >
      <Icon
        // type="material-community"
        // name="silverware-fork"
        type="ionicon"
        name="checkmark-sharp"
        reverse
        color="#0C0"
        iconProps={{ size: 40 }}
        // style={{ transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }}
        // onPress={({ nativeEvent: nev }) => {
        //   console.log(nev);
        //   fireTheCannon({
        //     taskId: task.id,
        //     origin: { x: nev.pageX, y: 932 - nev.pageY },
        //   });
        // }}
      />
      <ListItem.Content>
        <ListItem.Title style={st.itemTitle}>
          {task.name}
          {badgeStatus && (
            <>
              &nbsp;
              <Badge
                value={task.overdueness}
                status={badgeStatus}
                textStyle={st.badge}
              />
            </>
          )}
        </ListItem.Title>
        <ListItem.Subtitle style={st.itemSubtitle}>
          {task.intervalInWords}
          {task.overdueness > task.interval && isFirst && (
            <Text style={st.overdueWarning}>&nbsp;&nbsp;Do this first!</Text>
          )}
        </ListItem.Subtitle>
      </ListItem.Content>
      {/* <ListItem.Content right> */}
      {/* <ListItem.Title right> */}
      {/* <Badge value={task.overdueness} status="error" textStyle={st.badge} /> */}
      {/* </ListItem.Title> */}
      {/* <ListItem.Subtitle right style={st.itemSubtitle}>
        {task.overdueness > task.interval && isFirst && (
          <Text style={st.overdueWarning}>Do this first!</Text>
        )}
      </ListItem.Subtitle> */}
      {/* </ListItem.Content> */}
      <ListItem.Chevron color="black" />
    </ListItem>
  )
}

const st = StyleSheet.create({
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
  itemSubtitle: { fontSize: 16, marginTop: 5 },
  overdueWarning: { color: "red", fontStyle: "italic" },
})

export default TaskListItem
