# codepushDemo

1. 生成bundle文件
react-native bundle --entry-file index.js --bundle-output ./bundle/index.android.bundle --platform android --assets-dest ./bundle --dev false

2. 需注意更新bundle下所有文件，还是只更新android.bundle.js文件，是否强制更新等参数， 一定要注意版本号
code-push release codePushDemo ./bundle 1.0.0 --deploymentName Production --description "1.支持文章缓存。" --mandatory true

3. 查询相关历史
code-push deployment history codePushDemo Production
