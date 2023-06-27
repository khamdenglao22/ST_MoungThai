importScripts("https://www.gstatic.com/firebasejs/9.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.12.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCIEVhym24hLFa1di_-4reu2GWezoh2faA",
    authDomain: "sokxayall-a193b.firebaseapp.com",
    projectId: "sokxayall-a193b",
    storageBucket: "sokxayall-a193b.appspot.com",
    messagingSenderId: "312289947525",
    appId: "1:312289947525:web:0a0ad39ad3492c6dd4deec",
    measurementId: "G-TVVQHQ90NL"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = payload.title;
    const notificationOptions = {
        body: payload.body,
        icon:'PATH TO ICON IF ANY',
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});