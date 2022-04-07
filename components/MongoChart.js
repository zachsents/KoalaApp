import { WebView } from 'react-native-webview'

// Copied from Mongo Charts
// Should allow unauthenticated embedding
const iframe = `<iframe style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-fpjbx/embed/charts?id=62133b23-c099-41fc-8008-7a2fca3dde21&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>`


export default function MongoChart() {
    return (
        <WebView
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled
            style={{ height: 500, width: 300 }}
            source={{
                html: iframe
            }}
            automaticallyAdjustContentInsets={false}
        />
    )
}