import React from "react";
import { View,Text } from "react-native";
import DatePicker from "react-native-datepicker";


const DatePick = () => {
    const {inputStyle, labelStyle,viewStyle} = styles;
    return(
  <View style={viewStyle}>
    <Text style={labelStyle}>Fecha caducidad:</Text>
    <DatePicker
      style={{ width: 150 }}
      //date={this.state.date}
      date={"21-01-2019"}
      mode="date"
      placeholder="Selecciona una fecha:"
      format="DD-MM-YYYY"
      minDate="21-01-2019"
      maxDate="21-01-2099"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
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
      onDateChange={date => {
        this.setState({ date: date });
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

export {DatePick};