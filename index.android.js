/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle'
import CodePush from 'react-native-code-push';
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};


class CodePushDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            perent: 0
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let now = this.state.perent;
            let persent = now + 1;
            this.setState({
                perent: persent
            })
        }, 1000);

        CodePush.sync({
            updateDialog: {
                mandatoryContinueButtonLabel: "立即更新",
                optionalUpdateMessage: '有新版本了',
                title: '更新提示'
            },
            installMode: CodePush.InstallMode.IMMEDIATE,
            deploymentKey: 'ewGHxhsOdSCJENY5mXrkeR5scC4G71f76e94-2011-4f81-a856-8394b47369c3',
        });

    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require("./image/huizhongdai_img_banner.png")}/>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <PercentageCircle
                    radius={35}
                    percent={this.state.perent}
                    color={"#ffb133"}/>

                <View style={[styles.circle, {
                    width: 50,
                    height: 50,
                    borderRadius: 50
                }]}>
                    <Text style={styles.text}>{this.props.disabledText}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    circle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
    },
});
export default CodePushDemo = CodePush(codePushOptions)(CodePushDemo)

AppRegistry.registerComponent('CodePushDemo', () => CodePushDemo);
