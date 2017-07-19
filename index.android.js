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
    TouchableOpacity,
    ProgressBarAndroid,
    Dimensions
} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle'
// import CodePush from 'react-native-code-push';
import Drawer from 'react-native-drawer';
import ControlPanel from './app/controlPanel';
import TouchDrawer from './app/touchDrawer';
import DownloadProgress from './app/downloadProgress';

import RNFS from 'react-native-fs';

const {width,heiht} = Dimensions.get('window');

// let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};


class CodePushDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            perent: 0,
            progress:0,
            drawerState:false
        }
    }

    componentDidMount() {
        // this.timer = setInterval(() => {
        //     let now = this.state.perent;
        //     let persent = now + 1;
        //     this.setState({
        //         perent: persent
        //     })
        // }, 1000);

        // CodePush.sync({
        //     updateDialog: {
        //         mandatoryContinueButtonLabel: "立即更新",
        //         optionalUpdateMessage: '有新版本了',
        //         title: '更新提示'
        //     },
        //     installMode: CodePush.InstallMode.IMMEDIATE,
        //     deploymentKey: 'ewGHxhsOdSCJENY5mXrkeR5scC4G71f76e94-2011-4f81-a856-8394b47369c3',
        // });

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
            this.setState({
                drawerState : false
            });
        }else {
            this._drawer.open()
            this.setState({
                drawerState : true
            });
        }
    };

    _handleDownloadProgress(){
        const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/$yangyanshu.apk`;
        console.log('downloadDest',downloadDest);
        // const formUrl = 'http://qiniu-app.pgyer.com/b9cd06317b30f03a4783992e55f2fbc1.apk?e=1500357507&attname=app-debug.apk&token=6fYeQ7_TVB5L0QSzosNFfw2HU8eJhAirMF5VxV9G:4YllY8HDkzUEW8oqSO2U0KhN-Ns=&sign=a76fdcab3a950ca9e1b28a70e414b11f&t=596da383';
        const formUrl ='https://cashier.qianmi.com/appgen/Kstore/KstoreApp-latest.apk';
        // const formUrl ='http://qiniu-app.pgyer.com/37cf94567a5f680901c4e2a31cc8f68c.apk?e=1500357624&attname=app-debug.apk&token=6fYeQ7_TVB5L0QSzosNFfw2HU8eJhAirMF5VxV9G:oGKtVhE6MGvQjAry3HRXt9SIY6k=&sign=1ba42d00dadf8d49bd6b40dab1888bc3&t=596da3f8';
        let DownloadFileOptions = {
            fromUrl: formUrl,
            // URL to download file from
            jobId:123,
            toFile: downloadDest,      // Local filesystem path to save the file to
            // headers?: Headers;        // An object of headers to be passed to the server
            // background: boolean;
            // progressDivider: 10,
            begin: (res) => {
                // console.log(res);
            },
            progress: (res) => {
                console.log('progress',res,'downloadDest',downloadDest);
                let contentLength = res.contentLength;
                let bytesWritten = res.bytesWritten;
                let progress = bytesWritten/contentLength;
                this.setState({
                    progress:progress,
                })
            }
            // connectionTimeout?: number // only supported on Android yet
            // readTimeout?: number       // only supported on Android yet
        };
        try {
            const ret =RNFS.downloadFile(DownloadFileOptions);
            ret.promise.then(res=>{
                RNFS.openAPK(downloadDest);
                console.log('downloadFile',res,'downloadDest',downloadDest);
            }).catch(err=>{
                // console.log(err);
            })
        }catch (e){

        }


    }

    render() {
        if(__DEV__){
            console.log('打开的状态',this.state.drawerState)
        }
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<ControlPanel />}
                tapToClose={true}
                openDrawerOffset={0.5} // 20% gap on the right side of drawer
                panCloseMask={0.5}
                closedDrawerOffset={-3}
                styles={this.state.drawerState?drawerStyles:drawerStylesColse}
                onClose={()=>{
                    this.setState({
                        drawerState : false
                    });
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
            >
                <View style={styles.container}>
                    {/*<Image source={require("./image/huizhongdai_img_banner.png")}/>*/}
                    <Text style={styles.welcome}>
                        Welcome to React Native!
                    </Text>

                    <DownloadProgress
                        onPress={()=>this._handleDownloadProgress()}/>
                    <ProgressBarAndroid
                        color='purple'
                        styleAttr='Horizontal'
                        progress={this.state.progress}
                        indeterminate={false}
                        style={{marginTop:10,width:width}} />

                    <TouchDrawer
                        onPress={()=>this._handleDrawer()}/>
                    <Text style={styles.instructions}>
                        Double tap R on your keyboard to reload,{'\n'}
                        Shake or press menu button for dev menu
                    </Text>
                    {/*<PercentageCircle*/}
                        {/*radius={35}*/}
                        {/*percent={this.state.perent}*/}
                        {/*color={"#ffb133"}/>*/}

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
    main: {paddingLeft: 3,backgroundColor:'#000000'},
    mainOverlay:{backgroundColor:'#000000'}
};
const drawerStylesColse={
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3,backgroundColor:null},
    mainOverlay:{backgroundColor:null}
}

// export default CodePushDemo = CodePush(codePushOptions)(CodePushDemo)
export default CodePushDemo

AppRegistry.registerComponent('CodePushDemo', () => CodePushDemo);
