// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsYYYaytisPMKgJH_N3eft2FkgD6U8V6I",
  authDomain: "week7-aocheng.firebaseapp.com",
  projectId: "week7-aocheng",
  storageBucket: "week7-aocheng.appspot.com",   // ✅ 这里修正 ".app" → ".appspot.com"
  messagingSenderId: "104294440205",
  appId: "1:104294440205:web:eb7317e9d6db0de8342444"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ 导出 app 实例以便其他文件使用
export default app;
