/**
 * Created by Colin on 2017/7/21.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
const {width,height} = Dimensions.get('window');

class SwiperComponent extends React.Component {
    render() {
        return (
            <Swiper style={styles.wrapper}
                    height={200}
                    showsButtons={true}
                    autoplay={true}
                    loop={true}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 150,
        width:width
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default SwiperComponent;