import React from 'react';
import {View, ActivityIndicator} from 'react-native';

//size es un nombre random podira ser cualquier cosa
const Spinner = ({size, styleSpin}) => {
    return (
        <View style= {[styles.spinnerStyle, styleSpin]}>
            <ActivityIndicator size={size || 'large' }/>
            </View>
    );

};


const styles = {

    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
}

export {Spinner};