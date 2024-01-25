import * as rn from "react-native"

function SectionHeader({ title, onLayout }) {
  return (
    <rn.View onLayout={onLayout} style={st.container}>
      <rn.Text style={st.sectionHeader}>{title}</rn.Text>
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    padding: 10,
  },
})

export default SectionHeader
