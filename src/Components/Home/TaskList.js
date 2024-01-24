import { useState } from "react"
import { SectionList } from "react-native"
import * as rne from "react-native-elements"
import { useHeaderHeight } from "@react-navigation/elements"

import * as utils from "../../utils.js"

import SectionHeader from "../SectionHeader.js"
import TaskListItem from "./TaskListItem.js"
import TaskListEmptyState from "./TaskListEmptyState.js"

function tagFirstAndLast(arr) {
  return arr.map((task, ix, arr) => {
    if (ix === 0) {
      return { task, isFirst: true }
    } else if (ix === arr.length - 1) {
      return { task, isLast: true }
    }
    return { task }
  })
}

function TaskList({
  overdueTasks,
  dueTasks,
  onChangeActiveSectionTitle,
  onRequestEditTask,
  onRequestDismissTask,
}) {
  const headerHeight = useHeaderHeight()
  const [sectionOffsets, setSectionOffsets] = useState([])

  const sections = []
  const odLen = overdueTasks.length
  const duLen = dueTasks.length
  if (odLen > 0) {
    sections.push({
      ix: 0,
      title: `Running Late  (${odLen} task${utils.pluralS(odLen)})`,
      data: tagFirstAndLast(overdueTasks),
    })
  }
  if (duLen > 0) {
    sections.push({
      ix: 1,
      title: `Ready to Go  (${duLen} task${utils.pluralS(duLen)})`,
      data: tagFirstAndLast(dueTasks),
    })
    sections.push({
      ix: 2,
      title: `Up to date  (${duLen} task${utils.pluralS(duLen)})`,
      data: tagFirstAndLast(dueTasks),
    })
  }

  function renderItem({ item: { task, isFirst, isLast }, index, section }) {
    return (
      <TaskListItem
        task={task}
        isFirst={isFirst}
        isLast={isLast}
        onLayout={(ev) => onLayoutChild(ev, index, section)}
        onRequestEditTask={() => onRequestEditTask(task.id)}
        onRequestDismissTask={() => onRequestDismissTask(task.id)}
      />
    )
  }

  function renderSectionHeader({ section }) {
    return (
      <SectionHeader
        title={section.title}
        onLayout={(ev) => onLayoutChild(ev, -1, section)}
      />
    )
  }

  // const renderSection = ({ item: { title, data } }) => {
  //   return (
  //     <View>
  //       {renderSectionHeader({ section: { title } })}
  //       <FlatList
  //         data={data}
  //         keyExtractor={(_, index) => index}
  //         renderItem={({ item: { task, isFirst, isLast } }) => (
  //           <TaskListItem task={task} isFirst={isFirst} isLast={isLast} />
  //         )}
  //       ></FlatList>
  //     </View>
  //   )
  // }

  function onLayoutChild(ev, itemIx, section) {
    const secIx = section.ix
    const height = ev.nativeEvent.layout.height
    setSectionOffsets((prev) => {
      prev = [...prev]
      prev[secIx] ??= 0
      if (itemIx === -1) {
        prev[secIx] += height
      }
      if (secIx < sections.length - 1) {
        prev[secIx + 1] ??= 0
        prev[secIx + 1] += height
      }
      return prev
    })
  }

  function onScroll(ev) {
    const offset = ev.nativeEvent.contentOffset.y + headerHeight + 15
    const secIx = sectionOffsets.findLastIndex((o) => o < offset)
    if (secIx === -1) {
      onChangeActiveSectionTitle(null)
    } else {
      onChangeActiveSectionTitle(sections[secIx].title)
    }
  }

  return (
    <SectionList
      sections={sections}
      // data={getSections()}
      contentInsetAdjustmentBehavior="automatic"
      // data={tasks}
      keyExtractor={(_, index) => index}
      renderItem={renderItem}
      // renderItem={({ item }) => <TaskListItem task={item} />}
      // renderItem={renderSection}
      renderSectionHeader={renderSectionHeader}
      onScroll={onScroll}
      scrollEventThrottle={25}
      // onViewableItemsChanged={({ changed }) => console.log(changed)}
      // viewabilityConfig={{
      //   itemVisiblePercentThreshold: 100,
      // }}
      ListEmptyComponent={<TaskListEmptyState />}
      ListFooterComponent={<SectionHeader />}
    />
  )
}

export default TaskList
