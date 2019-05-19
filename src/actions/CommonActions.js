import RNFetchBlob from "react-native-fetch-blob";
import { Linking, Platform } from "react-native";
import { cloudyM } from "./ApiMethods";
import firebase from "react-native-firebase";

var cloudyArray = cloudyM();
const cloudyName = cloudyArray[0];
const cloudyPreset = cloudyArray[1];

export const today = () => {
  currentDay = new Date();
  if (currentDay.getMonth() < 10) {
    currentDay =
      currentDay.getDate() +
      "-" +
      "0" +
      (currentDay.getMonth() + 1) +
      "-" +
      currentDay.getFullYear();
  } else {
    currentDay =
      currentDay.getDate() +
      "-" +
      (currentDay.getMonth() + 1) +
      "-" +
      currentDay.getFullYear();
  }
  return currentDay;
};

export const oneMonth = () => {
  oneMonthLater = todayEpoch() + 2592000000;
  oneMonthLater = new Date(oneMonthLater);
  if (oneMonthLater.getMonth() < 10) {
    oneMonthLater =
      oneMonthLater.getDate() +
      "-" +
      "0" +
      (oneMonthLater.getMonth() + 1) +
      "-" +
      oneMonthLater.getFullYear();
  } else {
    oneMonthLater =
      oneMonthLater.getDate() +
      "-" +
      (oneMonthLater.getMonth() + 1) +
      "-" +
      oneMonthLater.getFullYear();
  }
  return oneMonthLater;
};

export const todayEpoch = () => {
  return new Date().getTime();
};

export const nowHour = () => {
  currentHour = new Date();
  currentHour =
    currentHour.getHours() +
    ":" +
    currentHour.getMinutes() +
    ":" +
    currentHour.getSeconds();
  return currentHour;
};

export const uploadFile = file => {
  return RNFetchBlob.fetch(
    "POST",
    "https://api.cloudinary.com/v1_1/" +
      cloudyName +
      "/image/upload?upload_preset=" +
      cloudyPreset,
    {
      "Content-Type": "multipart/form-data"
    },
    [
      {
        name: "file",
        filename: file.fileName,
        data: RNFetchBlob.wrap(file.path)
      }
    ]
  );
};

export const momentChecker = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var yyyy = today.getFullYear();
  var tTime = yyyy + "-" + mm + "-" + dd;
  return tTime;
};

export const openInMap = placeAddress => {
  const scheme = Platform.select({
    ios: "maps:0,0?q=",
    android: "geo:0,0?q="
  });
  // const latLng = this.props.product.longLat;
  const label = "Offer Address";
  const url = Platform.select({
    // ios: `${scheme}${label}@${latLng}`,
    ios: "http://maps.apple.com/?q=1" + `${placeAddress}`,
    //  android: `${scheme}${latLng}(${label})`
    android:
      "https://www.google.com/maps/search/?api=1&query=" + `${placeAddress}`
  });
  Linking.openURL(url);
};

async function getNotifToken() {
  var fcmToken = await firebase.messaging().getToken();
  return fcmToken;
}

export const whatProduct = value => {
  switch (value) {
    case 0:
      return "Carne y Pescado";
    case 1:
      return "Frutas & Vegetales";
    case 2:
      return "Dulces";
    case 3:
      return "Lácteos";
    case 4:
      return "Bebidas";
    default:
      return "";
  }
};

export const whatIndex = value => {
  switch (value) {
    case "Carne y Pescado":
      return 0;
    case "Frutas & Vegetales":
      return 1;
    case "Dulces":
      return 2 ;
    case "Lácteos":
      return 3 ;
    case "Bebidas":
      return  4;
    default:
      return -1;
  }
}

module.exports.getNotifToken = getNotifToken;
