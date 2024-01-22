import * as rn from "react-native"

function SectionHeader({ title, onLayout }) {
  return (
    <rn.View onLayout={onLayout}>
      {title && <rn.Text style={st.sectionHeader}>{title}</rn.Text>}
    </rn.View>
  )
}

const st = rn.StyleSheet.create({
  sectionHeader: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    padding: 10,
  },
})

export default SectionHeader
