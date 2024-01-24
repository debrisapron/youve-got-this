import * as rn from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { useFonts } from "expo-font"

import HomeScreen from "./Home/HomeScreen.js"
import TaskScreen from "./Task/TaskScreen.js"

import * as store from "../store/store.js"

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
          }) => {
            const isNew = taskId === "new"
            let headerTitle = tasks[taskId]?.name
            if (isNew) {
              headerTitle = headerTitle || "New task"
            }
            return {
              title: "Task",
              headerLargeTitle: true,
              headerTitle,
              headerTitleStyle: {
                color: isNew ? rn.PlatformColor("systemBlue") : "black",
              },
              headerBackTitle: isNew ? "Cancel" : "Back to tasks list",
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root
