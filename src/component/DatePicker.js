import React from "react";
import { View,Text } from "react-native";
import DatePicker from "react-native-datepicker";


const DatePick = ({ dateDefault, value, onDateChange }) => {
    const { labelStyle,viewStyle } = styles;
    return(
  <View style={viewStyle}>
    <Text style={labelStyle}>Consumir pref antes del :</Text>
    <DatePicker
      style={{ width: 140 }}
      
      date={ value }
      mode="date"
      placeholder="Selecciona una fecha:"
      format="DD-MM-YYYY"
      minDate="21-01-2019"
      maxDate= "01-06-2020"
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
          marginLeft: 36
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
    
  }
};

export { DatePick };