import * as react from "react"
import * as rn from "react-native"
import * as rne from "react-native-elements"

import * as store from "../../store/store.js"

const options = store.intervals

function renderIntervalOption(isSel, label, isLast, onSelect) {
  return (
    <rne.ListItem
      bottomDivider={!isLast}
      containerStyle={isLast && st.lastItem}
      onPress={onSelect}
    >
      <rne.ListItem.Content>
        <rne.ListItem.Title>{label}</rne.ListItem.Title>
      </rne.ListItem.Content>
      <rne.ListItem.Content right>
        <rne.Icon
          type="ionicon"
          name="checkmark-sharp"
          iconProps={{
            size: 30,
            color: isSel ? "black" : "white",
          }}
        />
      </rne.ListItem.Content>
    </rne.ListItem>
  )
}

function IntervalsPicker({ value, onSelectInterval }) {
  const [expanded, setExpanded] = react.useState(false)

  return (
    <rne.ListItem.Accordion
      bottomDivider={expanded}
      content={
        <>
          <rne.ListItem.Title style={st.label}>Schedule</rne.ListItem.Title>
          <rne.ListItem.Content></rne.ListItem.Content>
          <rne.ListItem.Content right>
            <rn.Text style={st.intervalsReadout}>
              {options.find((x) => x.days === value).label}
            </rn.Text>
          </rne.ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded((x) => !x)
      }}
      containerStyle={!expanded && st.lastItem}
    >
      <rn.FlatList
        data={options}
        keyExtractor={(_, index) => index}
        renderItem={({ item: { days, label }, index }) =>
          renderIntervalOption(
            days === value,
            label,
            index === options.length - 1,
            () => {
              onSelectInterval(days)
              setTimeout(() => setExpanded(false), 100)
            }
          )
        }
      />
    </rne.ListItem.Accordion>
  )
}

const st = rn.StyleSheet.create({
  lastItem: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: 700,
  },
  intervalsReadout: {
    fontSize: 18,
    width: 200,
    textAlign: "right",
  },
})

export default IntervalsPicker
