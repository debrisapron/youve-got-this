import { StyleSheet } from "react-native"
import { Button } from "react-native-elements"

function FullWidthButton({ disabled, onPress, title, color }) {
  return (
    <Button
      title={title}
      titleStyle={[st.buttonTitle, { color }]}
      buttonStyle={st.button}
      onPress={onPress}
      disabled={disabled}
    />
  )
}

const st = StyleSheet.create({
  button: {
    backgroundColor: "lightgray",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  },
  buttonTitle: {
    fontWeight: "700",
  },
})

export default FullWidthButton
