/**
 * Created by Colin on 2017/7/17.
 */
import React from 'react';
import {View, Text,TouchableOpacity,StyleSheet} from 'react-native';

class TouchDrawer extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={()=>this.props.onPress()}>
                <Text style={styles.instructions}>
                    打开键盘
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})



export  default TouchDrawer;