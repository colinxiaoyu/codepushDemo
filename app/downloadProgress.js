/**
 * Created by Colin on 2017/7/17.
 */
import React from 'react';
import {View, Text,TouchableOpacity,StyleSheet,ProgressBarAndroid,Dimensions} from 'react-native';
import RNFS from 'react-native-fs';
const {width}= Dimensions.get('window');

class DownloadProgress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            progress:0
        }
    }
    render() {
        return (
        <View>
            <TouchableOpacity
                onPress={()=>this._handleDownloadProgress()}>
                <Text style={styles.instructions}>
                    更新下载
                </Text>
            </TouchableOpacity>
            <ProgressBarAndroid
                color='purple'
                styleAttr='Horizontal'
                progress={this.state.progress}
                indeterminate={false}
                style={{marginTop:10,width:width}} />
        </View>
        )
    }

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
}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})



export  default DownloadProgress;