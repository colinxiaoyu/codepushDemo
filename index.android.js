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
    Image,
    TouchableOpacity
} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle'
import CodePush from 'react-native-code-push';
import Drawer from 'react-native-drawer';
import ControlPanel from './app/controlPanel'

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

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    _handleDrawer(){
        console.log("_handleDrawer",this._drawer._open);
        if(this._drawer._open){
            this._drawer.close()
        }else {
            this._drawer.open()
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<ControlPanel />}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
            >
                <View style={styles.container}>
                    <Image source={require("./image/huizhongdai_img_banner.png")}/>
                    <Text style={styles.welcome}>
                        Welcome to React Native!
                    </Text>
                    <TouchableOpacity
                        onPress={()=>this._handleDrawer()}>
                        <Text style={styles.instructions}>
                            打开键盘
                        </Text>
                    </TouchableOpacity>
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
            </Drawer>
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

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

export default CodePushDemo = CodePush(codePushOptions)(CodePushDemo)

AppRegistry.registerComponent('CodePushDemo', () => CodePushDemo);
