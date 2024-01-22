import * as zustand from "zustand"
import * as zcomp from "zustand-computed"
import * as utils from "./utils.js"

const TEST_TASKS = {
  e_Jyu4XpP1SI8ELoOckSD: {
    name: "Kitty Litter",
    done: utils.now().subtract(utils.days(0)).toString(),
    interval: 2,
    prevDone: utils.now().subtract(utils.days(3)).toString(),
  },
  "6T_dE-G5VYrP7fCwkMm5X": {
    name: "Hoover",
    done: utils.now().subtract(utils.days(3)).toString(),
    interval: 3,
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  yGTNedXnPm3lICLye3z9p: {
    name: "Laundry",
    interval: 3,
    done: utils.now().subtract(utils.days(4)).toString(),
  },
  SD4T2EPZUKzmSeiJN3byP: {
    name: "Tidying",
    interval: 2,
    done: utils.now().subtract(utils.days(5)).toString(),
  },
  yfhu2OwOMGQhQHo9KauMc: {
    name: "Kitchen",
    interval: 1,
    done: utils.now().subtract(utils.days(5)).toString(),
  },
  e1FT3vsNMlR0wn5KJL0m_: {
    name: "Pills",
    interval: 1,
    done: utils.now().subtract(utils.days(1)),
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  M_qzsbxr_Fz5L0zoP0qyu: {
    name: "Brush Teeth",
    interval: 1,
    done: utils.now().subtract(utils.days(0)).toString(),
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  "Aa8XNoaStuQ7kNXsK-hzK": {
    name: "Shower",
    interval: 2,
    done: utils.now().subtract(utils.days(3)).toString(),
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  "3Qp4HGnIbfUfw4hX6t8vt": {
    name: "DD: Homework",
    interval: 3,
    done: utils.now().subtract(utils.days(6)).toString(),
  },
  oiWPBQVzfvPTOuitLUz4h: {
    name: "DD: Clean Room",
    interval: 2,
    done: utils.now().subtract(utils.days(3)).toString(),
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  "LDBsvdtKmbQQQHlZ-kpB3": {
    name: "DD: Piano Practice",
    interval: 2,
    done: utils.now().subtract(utils.days(5)).toString(),
  },
  GF2a7F5EkSWEZndaIoz0R: {
    name: "DD: School Stuff",
    interval: 7,
    done: utils.now().subtract(utils.days(5)).toString(),
  },
  "TOWX-eTDeH27gcHW92ZNf": {
    name: "DD: Kids Klub Stuff",
    interval: 7,
    done: utils.now().subtract(utils.days(0)).toString(),
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  Cj37Iqu6jm3K7kne4alfg: {
    name: "Cats Water Bowl",
    done: utils.now().subtract(utils.days(0)).toString(),
    interval: 2,
    prevDone: utils.now().subtract(utils.days(3)).toString(),
  },
  "oLzw7tKguB-HsLifghGIN": {
    name: "Take Out Trash",
    interval: 2,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: utils.now().subtract(utils.days(5)).toString(),
  },
  gDMLlrY7iX224SGylJtOn: {
    name: "Wifey",
    interval: 7,
    done: utils.now().subtract(utils.days(2)).toString(),
    prevDone: null,
  },
  H4OXOSeqnzgAVtxT9SIJJ: {
    name: "Groceries",
    interval: 4,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: utils.now().subtract(utils.days(2)).toString(),
  },
  "4GhDNMgf2gyV2m12pNYkz": {
    name: "Paper Mail",
    interval: 14,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: null,
  },
  nH8X3fvSbZkELlF7nGH16: {
    name: "Email",
    interval: 3,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: null,
  },
  "1etJ0MVdTayIWNDM4F00j": {
    name: "Jobhunt",
    interval: 1,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: null,
  },
  GQx0mZz7IOu51NZ1tPogD: {
    name: "Cat's Water Fountain",
    interval: 4,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: null,
  },
  "wIcr03-atNijXyWCsos9i": {
    name: "Clear Sink",
    interval: 1,
    done: utils.now().subtract(utils.days(1)).toString(),
    prevDone: null,
  },
}

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

function getIntervals() {
  return allowedIntervals.map((i) => ({
    days: i,
    label: getIntervalInWords(i),
  }))
}

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

function getTasksList(state) {
  return Object.entries(state._tasks)
    .map(([id, task]) => decorateTask(id, task))
    .sort((a, b) => b.overdueness - a.overdueness || a.interval - b.interval)
}

function computeState(state) {
  const tasksList = getTasksList(state)
  return {
    tasksList,
    tasks: Object.fromEntries(tasksList.map((task) => [task.id, task])),
    dueTasksList: filterDue(tasksList),
    overdueTasksList: filterOverdue(tasksList),
    intervals: getIntervals(),
  }
}

export const useStore = zustand.create(
  zcomp.computed((set) => {
    function updateTask(id, patch) {
      const cb = typeof patch === "function" && patch
      const isNew = id === "new"

      if (id === "new") {
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

    return {
      _tasks: TEST_TASKS,
      _new: null,

      taskListSectionTitle: null,

      dismissTask(id) {
        updateTask(id, (task) => ({
          prevDone: task.done,
          done: utils.now(),
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
  }, computeState)
)
