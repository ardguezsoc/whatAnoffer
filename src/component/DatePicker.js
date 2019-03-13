import React from "react";
import { View, Text } from "react-native";
import DatePicker from "react-native-datepicker";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
import { today, oneMonth } from "../actions";

const DatePick = ({ onDateChange, value }) => {
  const { viewStyle } = styles;
  return (
    <View style={viewStyle}>
      {/* <Text style={labelStyle}>Fecha consumisión</Text> */}
      <FontAwesome
        style={{ fontSize: 26, paddingLeft: 10, color: "#747474" }}
        type={IconTypes.FAR}
      >
        {Icons.calendarAlt}
      </FontAwesome>
      <DatePicker
        style={{ width: 300 }}
        date={value}
        mode="date"
        showIcon={false}
        placeholder="Fecha de consumisión"
        format="DD-MM-YYYY"
        minDate={today()}
        maxDate={oneMonth()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={onDateChange}
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 75
          }
        }}
      />
    </View>
  );
};

const styles = {
  labelStyle: {
    fontSize: 15,
    paddingLeft: 10,
    marginRight: 10,
    marginTop: 5
  },
  viewStyle: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 10
  }
};

export { DatePick };
