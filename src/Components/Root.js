import * as rn from "react-native"
import * as rnn from "@react-navigation/native"
import * as rnnStack from "@react-navigation/native-stack"
import * as store from "../store/store.js"

import HomeScreen from "./Home/HomeScreen.js"
import TaskScreen from "./Task/TaskScreen.js"

const Stack = rnnStack.createNativeStackNavigator()

function Root() {
  // TODO move this from store to a callback
  const taskListSectionTitle = store.useStore(
    (state) => state.taskListSectionTitle
  )
  const tasks = store.useStore((state) => state.tasks)

  return (
    <rnn.NavigationContainer>
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
    </rnn.NavigationContainer>
  )
}

export default Root
