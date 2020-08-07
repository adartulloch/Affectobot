firebase.initializeApp({
    apiKey: process.env.firebaseKey,
    authDomain: process.env.firebaseAuth,
    projectId: process.env.firebaseId
});
  
var db = firebase.firestore();

// let uid
// ZoomMtg.getCurrentUser({
//     success: function (res) {
//       uid = res.result.currentUser
//     },
// });


const pushToDb = (data) => {
    db.collection('currentMeeting').doc('emotionTracking').set(data)
}