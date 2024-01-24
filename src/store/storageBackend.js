import * as zmw from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

// function fname(name) {
//   return `/${name}.json`
// }

// let _waitingForReady = null
// async function prepare() {
//   let attemptNo = 1
//   while (attemptNo < 10) {
//     let ok = false
//     try {
//       _waitingForReady ??= rncs.CloudStorage.isCloudAvailable()
//       ok = await _waitingForReady
//     } catch (e) {
//       console.error(e)
//     }
//     if (ok) {
//       return
//     }
//     attemptNo++
//     await new Promise((resolve) => setTimeout(resolve, 100))
//   }
//   throw new Error("CloudStorage not ready after 10 attempts!")
// }

// async function removeItem(name) {
//   try {
//     await prepare()
//     await rncs.CloudStorage.unlink(fname(name))
//   } catch (e) {
//     console.error(e)
//   }
// }

// async function setItem(name, value) {
//   try {
//     await prepare()
//     await rncs.CloudStorage.writeFile(fname(name), value)
//   } catch (e) {
//     console.error(e)
//   }
// }

// async function getItem(name) {
//   let value = ""
//   try {
//     await prepare()
//     const exists = await rncs.CloudStorage.exists(fname(name))
//     if (!exists) {
//       return ""
//     }
//     value = await rncs.CloudStorage.readFile(fname(name))
//   } catch (e) {
//     console.error(e)
//   }
//   return value
// }

const persistConfig = {
  name: "app-state",
  storage: zmw.createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({ _tasks: state._tasks }),
}

function persist(store) {
  return zmw.persist(store, persistConfig)
}

export { persist }
