import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { Icon, ListItem } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

import * as store from "../../store.js"

function renderInterval(task, days, label, isFirst, isLast, onSelect) {
  const isSel = days === task.interval
  let itemStyle = {}
  if (isFirst) {
    itemStyle = st.firstItem
  } else if (isLast) {
    itemStyle = st.lastItem
  }

  return (
    <ListItem
      bottomDivider={!isLast}
      containerStyle={itemStyle}
      onPress={onSelect}
    >
      <ListItem.Content>
        <ListItem.Title>{label}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content right>
        <Icon
          type="ionicon"
          name="checkmark-sharp"
          iconProps={{
            size: 30,
            color: isSel ? "black" : "white",
          }}
        />
      </ListItem.Content>
    </ListItem>
  )
}

function IntervalsScreen({ route }) {
  const intervals = store.useStore((state) => state.intervals)
  const setTaskInterval = store.useStore((state) => state.setTaskInterval)
  const { taskId } = route.params
  const task = store.useStore((state) => state.tasks[taskId])
  const navigation = useNavigation()

  return (
    <View style={st.container}>
      <SafeAreaView>
        <View style={st.sectionHeader} />
        <Text style={st.sectionHeader}>Select task schedule</Text>
        <FlatList
          data={intervals}
          keyExtractor={(_, index) => index}
          renderItem={({ item: { days, label }, index }) =>
            renderInterval(
              task,
              days,
              label,
              index === 0,
              index === intervals.length - 1,
              () => {
                setTaskInterval(task.id, days)
                navigation.goBack()
              }
            )
          }
        />
      </SafeAreaView>
    </View>
  )
}

const st = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  sectionHeader: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    padding: 10,
  },
  firstItem: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  lastItem: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
})

export default IntervalsScreen
