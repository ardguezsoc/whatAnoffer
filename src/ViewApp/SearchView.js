import React, { Component } from "react";
import _ from "lodash";
import { View, Text } from "react-native";
import { SearchBar } from "react-native-elements";

class SearchView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textSearch: '',
      inputValue: '',
      loadingV: false
    };

    this.updateMessage = _.debounce(this.updateMessage, 400);
  }

  fetchMode(textSearch){
    this.setState({textSearch})
    if(textSearch.length > 3){
      this.setState({loadingV: true})
      console.log(this.state.textSearch)
      //loading false after fetch 

    }else{
      this.setState({loadingV: false})
    }
  // if value.length == 0 clear value reset the flat list and loading false 
  }

  onChange = inputValue  => {
    this.setState({ inputValue });
      this.updateMessage(inputValue);
     
  }

  

  updateMessage = textSearch => this.fetchMode(textSearch);

  render() {
    const { textSearch, inputValue, loadingV } = this.state;
    return (
      <View>
      <SearchBar
        inputStyle={{
          backgroundColor: "white",
          borderRadius: 15,
          color: "black"
        }}
        showLoadingIcon = {loadingV}
        clearIcon
        containerStyle={{ backgroundColor: "#109C59" }}
        placeholder="Buscar..."
        onChangeText={this.onChange}
        value = { inputValue }
      />
      <Text>{textSearch}</Text>
      </View>
    );
  }
}

export default SearchView;
