import * as zustand from "zustand"
import * as zcomp from "zustand-computed"
import * as utils from "../utils.js"

// When run with "npm run dev" we use the mock storage
// backend at test/mockStorageBackend.js
import * as storageBackend from "./storageBackend.js"

//// COMPUTED STATE ////

function getOverdueness(task) {
  const daysOld = utils.daysSince(task.done)
  return daysOld - task.interval
}

const allowedIntervals = [1, 2, 3, 4, 7, 14]

function getIntervalInWords(interval) {
  if (interval === 1) {
    return "Daily"
  } else if (interval === 2) {
    return "Every other day"
  } else if (interval === 7) {
    return "Weekly"
  } else if (interval === 14) {
    return "Biweekly"
  }
  return `Every ${interval} days`
}

const intervals = allowedIntervals.map((i) => ({
  days: i,
  label: getIntervalInWords(i),
}))

function decorateTask(id, task) {
  return {
    ...task,
    id,
    intervalInWords: getIntervalInWords(task.interval),
    overdueness: getOverdueness(task),
  }
}

function filterOverdue(tasks) {
  return tasks.filter((task) => task.overdueness > 0)
}

function filterDue(tasks) {
  return tasks.filter((task) => task.overdueness === 0)
}

function filterDone(tasks) {
  return tasks.filter((task) => task.overdueness < 0)
}

function getTasksList(state) {
  return Object.entries(state._tasks)
    .map(([id, task]) => decorateTask(id, task))
    .sort((a, b) => b.overdueness - a.overdueness || a.interval - b.interval)
}

function computeState(state) {
  const tasksList = getTasksList(state)
  return {
    tasksList,
    tasks: Object.fromEntries(
      tasksList.map((task) => [task.id, task]).concat([["new", state._new]])
    ),
    dueTasksList: filterDue(tasksList),
    overdueTasksList: filterOverdue(tasksList),
    doneTasksList: filterDone(tasksList),
  }
}

function getNewTask() {
  return {
    name: "",
    interval: 1,
    done: null,
    prevDone: null,
  }
}

//// STORE DEFINITION ////

function getStoreConfig(set, get) {
  // Helper function for easily updating a task
  function updateTask(id, patch) {
    const cb = typeof patch === "function" && patch
    const isNew = id === "new"

    if (isNew) {
      set(({ _new }) => {
        const diff = cb ? cb(_new) : patch
        return { _new: { ..._new, ...diff } }
      })
      return
    }

    set(({ _tasks }) => {
      const diff = cb ? cb(_tasks[id]) : patch
      return {
        _tasks: {
          ..._tasks,
          [id]: { ..._tasks[id], ...diff },
        },
      }
    })
  }

  // Store configuration object
  return {
    _tasks: {},
    _new: getNewTask(),

    taskListSectionTitle: null,

    createTask() {
      const newTask = get()._new
      newTask.done = utils
        .now()
        .subtract(utils.days(newTask.interval))
        .toString()
      const id = utils.uuid()
      updateTask(id, newTask)
      set({ _new: getNewTask() })
    },

    dismissTask(id) {
      updateTask(id, (task) => ({
        prevDone: task.done,
        done: utils.now().toString(),
      }))
    },

    setTaskName(id, name) {
      updateTask(id, { name })
    },

    setTaskInterval(id, interval) {
      updateTask(id, { interval })
    },

    setTaskListSectionTitle: (title) => set({ taskListSectionTitle: title }),

    deleteTask(id) {
      set(({ _tasks }) => {
        const { [id]: _, ...rest } = _tasks
        return { _tasks: rest }
      })
    },
  }
}

//// SETUP ////

const useStore = utils.compose(
  zustand.create,
  (store) => zcomp.computed(store, computeState),
  storageBackend.persist
)(getStoreConfig)

export { useStore, intervals }
