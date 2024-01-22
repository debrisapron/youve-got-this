import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { useFonts } from "expo-font"

import HomeScreen from "./Home/HomeScreen.js"
import TaskScreen from "./Task/TaskScreen.js"
import IntervalsScreen from "./Task/IntervalsScreen.js"

import * as store from "../store.js"

const Stack = createNativeStackNavigator()

const Root = () => {
  // const [fontsLoaded] = useFonts({
  //   FactuallyHandwriting: require("../assets/FactuallyHandwriting.otf"),
  // })
  const taskListSectionTitle = store.useStore(
    (state) => state.taskListSectionTitle
  )
  const tasks = store.useStore((state) => state.tasks)
  // console.log("tasks", tasks)
  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "You've got this",
            headerLargeTitle: true,
            headerTitle: taskListSectionTitle,
          }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={({
            route: {
              params: { taskId },
            },
          }) => ({
            title: "[New Task]",
            headerLargeTitle: true,
            headerTitle: taskId === "new" ? null : tasks[taskId]?.name,
            headerBackTitle: "Back to tasks list",
          })}
        />
        <Stack.Screen
          name="Intervals"
          component={IntervalsScreen}
          options={({
            route: {
              params: { taskId },
            },
          }) => ({
            title: "[New Task]",
            headerLargeTitle: true,
            headerTitle: taskId === "new" ? null : tasks[taskId]?.name,
            headerBackTitle: "Back to task details",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root
