import * as zmw from "zustand/middleware"
import * as utils from "../src/utils.js"

const TEST_TASKS = {
  e_Jyu4XpP1SI8ELoOckSD: {
    name: "Kitty Litter",
    done: utils.now().subtract(utils.days(0)).toString(),
    interval: 2,
  },
  "6T_dE-G5VYrP7fCwkMm5X": {
    name: "Hoover",
    done: utils.now().subtract(utils.days(3)).toString(),
    interval: 3,
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
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  M_qzsbxr_Fz5L0zoP0qyu: {
    name: "Brush Teeth",
    interval: 1,
    done: utils.now().subtract(utils.days(0)).toString(),
  },
  "Aa8XNoaStuQ7kNXsK-hzK": {
    name: "Shower",
    interval: 2,
    done: utils.now().subtract(utils.days(3)).toString(),
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
  },
  Cj37Iqu6jm3K7kne4alfg: {
    name: "Cats Water Bowl",
    done: utils.now().subtract(utils.days(0)).toString(),
    interval: 2,
  },
  "oLzw7tKguB-HsLifghGIN": {
    name: "Take Out Trash",
    interval: 2,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  gDMLlrY7iX224SGylJtOn: {
    name: "Wifey",
    interval: 7,
    done: utils.now().subtract(utils.days(2)).toString(),
  },
  H4OXOSeqnzgAVtxT9SIJJ: {
    name: "Groceries",
    interval: 4,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  "4GhDNMgf2gyV2m12pNYkz": {
    name: "Paper Mail",
    interval: 14,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  nH8X3fvSbZkELlF7nGH16: {
    name: "Email",
    interval: 3,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  "1etJ0MVdTayIWNDM4F00j": {
    name: "Jobhunt",
    interval: 1,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  GQx0mZz7IOu51NZ1tPogD: {
    name: "Cat's Water Fountain",
    interval: 4,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
  "wIcr03-atNijXyWCsos9i": {
    name: "Clear Sink",
    interval: 1,
    done: utils.now().subtract(utils.days(1)).toString(),
  },
}

function persist(store) {
  return zmw.persist(store, {
    name: "app-state",
    storage: zmw.createJSONStorage(() => ({
      getItem: () => JSON.stringify({ state: { _tasks: TEST_TASKS } }),
      setItem: () => {},
      removeItem: () => {},
    })),
    partialize: (state) => ({ _tasks: state._tasks }),
  })
}

export { persist }
