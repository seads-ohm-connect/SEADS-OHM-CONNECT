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
    }

    async findID(userID) {
      if( !getFirebase().auth().currentUser) {
        return 'TEST';
      }
      else {
        var ref = getFirebase().database().ref('users/' + userID + '/seadsDevice/seadsID' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            if(snapshot.val() === ''){
              return -1;
            }
            return snapshot.val();
          }
        });
      }
    }

    async findIndex(id) {
      if(id < 0){
        return -1;
      }
      if( !getFirebase().auth().currentUser){
        return 0;
      }
      else{
        var seadsURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");
        return d3.json(seadsURL).then( (liveData) => {
          var i;
          for(i = 0; i < liveData.DataPoints.length; i++){
            if(liveData.DataPoints[i].DeviceId == id){
              return i;
            }
          }
          //Returns -1 when the user has a SEADS ID, but it is not in the Database
          return -2;
        });
      }
    }

    async findPower(id) {

        var seadsURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");
        return d3.json(seadsURL).then( (liveData) => {
          if(id >= 0){
            var watts = liveData.DataPoints[id].Power;
            var currentTime = new Date(liveData.DataPoints[id].Timestamp*1000).toLocaleString();
            this.liveData = watts;
            this.liveTime = currentTime;
            return [watts, currentTime];
          }
        });
    }

    async getSeadsData(userID) {
      return this.findID(userID).then( (id) => {
          this.userDeviceId = id;
          return this.findIndex(this.userDeviceId).then( (ind) => {
              this.userDeviceIndex = ind;
              if(this.userDeviceIndex === -1){
                return ["-1", "-1"];
              }
              else if(this.userDeviceIndex === -2){
                return ['-2', '-2']
              }
              return this.findPower(this.userDeviceIndex).then((powTime) => {
                if(powTime){
                  this.liveData = powTime[0];
                  this.liveTime = powTime[1];
                }
                return [this.liveData, this.liveTime];
              });
          });
      });
    }
}
export default GetDevice;