import * as react from "react"
import * as rn from "react-native"
import * as rne from "react-native-elements"

// function SectionHeader({ title, onLayout }) {
//   const [expanded, setExpanded] = react.useState(false)
//   // return (
//   //   <rne.ListItem onLayout={onLayout} containerStyle={st.listItemContainer}>
//   //     <rn.Text style={st.sectionHeader}>{title}</rn.Text>
//   //   </rne.ListItem>
//   // )

//   return (
//     <rne.ListItem.Accordion
//       containerStyle={st.listItemContainer}
//       bottomDivider={expanded}
//       content={
//         <rne.ListItem.Content>
//           <rn.Text style={st.sectionHeader}>{title}</rn.Text>
//         </rne.ListItem.Content>
//       }
//       isExpanded={expanded}
//       onPress={(x) => setExpanded(!x)}
//     />
//   )
// }

function SectionHeader({ title, onLayout }) {
  const [isExpanded, setIsExpanded] = react.useState(false)
  return (
    <rn.View
      onLayout={onLayout}
      style={st.container}
      onPress={() => setIsExpanded((x) => !x)}
    >
      <rn.Text style={st.sectionHeader}>{title}</rn.Text>
      {/* <rne.Icon style={st.chevron} name={"chevron-down"} type="ionicon" /> */}
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#00000000",
    padding: 0,
    paddingRight: 5,
    margin: 0,
  },
  sectionHeader: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    padding: 10,
    // backgroundColor: "pink",
    // width: 300,
    width: "1fr",
  },
  chevron: {
    padding: 10,
    alignSelf: "flex-end",
    // backgroundColor: "purples",
    width: "1fr",
  },
})

export default SectionHeader
