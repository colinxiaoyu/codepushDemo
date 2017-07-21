/**
 * Created by Colin on 2017/7/21.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';

class PercentageCircleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persent: 0
        }
    }

    render() {
        return (
            <PercentageCircle
                style={styles.circle}
                radius={35}
                percent={this.state.persent}
                color={"#ffb133"}/>
        )
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let now = this.state.persent;
            let persent = now + 1;
            this.setState({
                persent: persent
            })
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }
}

const styles = StyleSheet.create({
    circle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
    },
})

export  default PercentageCircleComponent;
