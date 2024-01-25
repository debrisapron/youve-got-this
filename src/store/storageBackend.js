import * as zmw from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

const persistConfig = {
  name: "app-state",
  storage: zmw.createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({ _tasks: state._tasks }),
}

function persist(store) {
  return zmw.persist(store, persistConfig)
}

export { persist }
