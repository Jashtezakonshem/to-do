import React, { FunctionComponent } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Colors } from "../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated from "react-native-reanimated";

const BOX_SIZE = 24;

export type CheckBoxProps = {
  style?: StyleProp<ViewStyle>;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
};

const CheckBox: FunctionComponent<CheckBoxProps> = ({
  checked = false,
  onValueChange,
  style,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = checked ? Colors.secondary : Colors.light;
    const borderColor = checked ? Colors.secondary : Colors.dark;
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 150 }),
      borderColor: withTiming(borderColor, { duration: 150 }),
    };
  }, [checked]);
  const onPress = () => {
    onValueChange(!checked);
  };

  return (
    <Pressable style={style} onPress={onPress}>
      <Animated.View style={[animatedStyle, styles.box]}>
        {checked ? (
          <AntDesign name={"check"} size={BOX_SIZE - 2} color={Colors.light} />
        ) : null}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default CheckBox;
