// import * as react from "react"
import * as rn from "react-native"
// import * as rne from "@react-navigation/elements"

import * as utils from "../../utils.js"

import SectionHeader from "../SectionHeader.js"
import TaskListSection from "./TaskListSection.js"
import TaskListEmptyState from "./TaskListEmptyState.js"

function TaskList({
  overdueTasks,
  dueTasks,
  doneTasks,
  // onChangeActiveSectionTitle, // TODO Fix this
  onRequestEditTask,
  onRequestDismissTask,
}) {
  // const headerHeight = useHeaderHeight()
  // const [sectionOffsets, setSectionOffsets] = useState([])

  const sections = []
  const odLen = overdueTasks.length
  const duLen = dueTasks.length
  const dnLen = doneTasks.length
  if (odLen > 0) {
    sections.push({
      title: `Running Late  (${odLen} task${utils.pluralS(odLen)})`,
      data: overdueTasks,
      collapsible: false,
    })
  }
  if (duLen > 0) {
    sections.push({
      title: `Ready to Go  (${duLen} task${utils.pluralS(duLen)})`,
      data: dueTasks,
      collapsible: odLen > 0,
    })
  }
  if (dnLen > 0) {
    sections.push({
      title: `Up to date  (${duLen} task${utils.pluralS(duLen)})`,
      data: doneTasks,
      collapsible: true,
    })
  }

  function renderItem({ item: { title, data, collapsible }, index }) {
    return (
      <TaskListSection
        collapsible={collapsible}
        tasks={data}
        title={title}
        // onLayout={(ev) => onLayoutChild(ev, index)}
        onRequestEditTask={onRequestEditTask}
        onRequestDismissTask={onRequestDismissTask}
      />
    )
  }

  // function onLayoutChild(ev, secIx) {
  //   const height = ev.nativeEvent.layout.height
  //   setSectionOffsets((prev) => {
  //     prev = [...prev]
  //     prev[secIx] ??= 0
  //     if (itemIx === -1) {
  //       prev[secIx] += height
  //     }
  //     if (secIx < sections.length - 1) {
  //       prev[secIx + 1] ??= 0
  //       prev[secIx + 1] += height
  //     }
  //     return prev
  //   })
  // }

  // function onScroll(ev) {
  //   const offset = ev.nativeEvent.contentOffset.y + headerHeight + 15
  //   const secIx = sectionOffsets.findLastIndex((o) => o < offset)
  //   if (secIx === -1) {
  //     onChangeActiveSectionTitle(null)
  //   } else {
  //     onChangeActiveSectionTitle(sections[secIx].title)
  //   }
  // }

  return (
    <rn.FlatList
      data={sections}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(_, ix) => ix}
      renderItem={renderItem}
      // onScroll={onScroll}
      // scrollEventThrottle={25}
      ListEmptyComponent={<TaskListEmptyState />}
      ListFooterComponent={<SectionHeader />}
    />
  )
}

export default TaskList
