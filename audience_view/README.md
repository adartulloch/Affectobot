# Affectobot 

All of Affectobot's code lives in this repo. 

### Getting Started with Meetings
[Web-Client-SDK Overview](https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/overview)

### Built Using the Zoom Web SDK

Refer to the [Web SDK Documentation](https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/api-reference)

[Upcoming changes](https://marketplace.zoom.us/docs/guides/getting-started/stay-up-to-date/upcoming-changes/web-sdk)


### Include the source

```
<script src="https://source.zoom.us/zoom-meeting-1.7.10.min.js"></script>
```
### or

```
npm install @zoomus/websdk@1.7.10
```
### zoomus-jssdk move to @zoomus/websdk
```
import { ZoomMtg } from 'zoomus-jssdk';
change to
import { ZoomMtg } from '@zoomus/websdk';
```
Please notice, 1.7.10 release with two ways, the normal way and npm way(need babel and webpack).

At first, you invoke those three API to init jssdk.
```
console.log('checkSystemRequirements');
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
// if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.10/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.10/lib', '/av'); // china cdn option
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
```
Go to see sample web app (CDN version) how to update 1.7.10


[![sample](https://zoom.github.io/sample-app-web/img/participent-joined-meeting.png)]()

## Screen share
```
ZoomMtg.init({
...
screenShare: true, // default, and it also require account's sharing setting enabled.
...    
})
```

## Chat
```
ZoomMtg.init({
...
isSupportChat: true, // default, and it also require account's sharing setting enabled.
...    
})
```

## Webinar notice
If you want to join webinar you will need to add your email to the userEmail property within the join method and set the role to 0 within the meetingConfig function.

```
ZoomMtg.join({
...
userEmail: "hello@zoom.us",
...    
})
 ```
 ```
  role: 0
 ```


### Video, Computer Audio and Sharing Supported browser
Feature | Chrome | firefox | Safari | Edge | IE >=11 | Opera | Vivaldi | Edge(Chromium)
------------ | ------------- | ------------ | ------------- | ------------ |  ------------- | ------------ | ------------ | ------------
Video | yes| yes | yes | NULL | no | yes | yes | yes
Computer Audio | yes | only linux | no | NULL | no | no | yes | yes
View Sharing | yes | yes | yes | NULL | yes| yes | yes | yes
Screen Sharing | >=72 | >=66 | no | NULL | no | no | yes | yes
Chat | yes | yes | yes | NULL | yes | yes | yes | yes | yes

Notice: WebSDK doesn't support IE10 and Edge currently.  

### Support
For any issues regarding our Web Client SDK, please visit our new Community Support Forum at

[https://devforum.zoom.us/](https://devforum.zoom.us/)

[Register your API Key/Secret](https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/getting-started/prerequisites)

[Transitioning-your-developer-apps-to-zooms-marketplace](https://medium.com/zoom-developer-blog/transitioning-your-developer-apps-to-zooms-marketplace-6a8de3386716)


## Quick start
### More detail
[https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/getting-started/integrate-the-sdk](https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/getting-started/integrate-the-sdk)

###  sample web app (CDN version) with dependecies.

```javascript
git clone https://github.com/zoom/sample-app-web.git --branch master --depth 1
cd sample-app-web/CDN
npm install
npm run start
```

### sample web app (local version)
```javascript
git clone https://github.com/zoom/sample-app-web.git --branch master --depth 1
cd sample-app-web/Local
npm install
npm run start
```

open browser http://localhost:9999

### run demo with https
we provide a https option, other machines can join the demo and test audio and video feature.

notice: the certification signed by localhost. don't use in your production.

```
npm run https
```
open browser https://localhost:9999

## License

Use of this software is subject to important terms and conditions as set forth in the License file

Please refer to [LICENSE.md](LICENSE.md) file for details
