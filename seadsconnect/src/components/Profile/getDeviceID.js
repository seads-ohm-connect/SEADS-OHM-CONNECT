import getFirebase from '../firebase'
import React, { Component } from "react"


var d3 = require("d3");
class GetDevice {
    constructor(props){
      this.state = {
        userDeviceID: 'TEST',
        userDeviceIndex: 0,
        liveData: 0,
        liveTime: new Date().toLocaleString(),
      }
      this.mount = true
    }

    async findID() {
      console.log("In findIDr");
      if( !getFirebase().auth().currentUser) {
        return 'TEST';
      }
      else {
        console.log("logged in");
        var userId = getFirebase().auth().currentUser.uid;
        var ref = getFirebase().database().ref('users/' + userId + '/seadsDevice/seadsID' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            console.log("found snapshot");
            return snapshot.val();
          }
        });
      }
    }

    async findIndex(id) {
      console.log("In findIndex");
      if( !getFirebase().auth().currentUser){
        return 0;
      }
      else{
        console.log("logged in");
        var seadsURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");
        return d3.json(seadsURL).then( (liveData) => {
          var i;
          console.log(id + "ID in index loop");
          for(i = 0; i < liveData.DataPoints.length; i++){
            if(liveData.DataPoints[i].DeviceId == id){
              console.log(i + " In index loop");
              return i;
            }
          }
        });
      }
    }

    async findPower(id) {
      console.log("In findPower");
      console.log(id);
        var seadsURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");
        return d3.json(seadsURL).then( (liveData) => {
          console.log(id + " ID from .json");
          if(id >= 0){
            console.log("searching DB");
            var watts = liveData.DataPoints[id].Power;
            var currentTime = new Date(liveData.DataPoints[id].Timestamp*1000).toLocaleString();
            this.liveData = watts;
            this.liveTime = currentTime;
            console.log(this.liveData);
            console.log(this.liveTime);
            return [watts, currentTime];
          }
        });
    }
}
export default GetDevice;
