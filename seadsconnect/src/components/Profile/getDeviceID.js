import getFirebase from '../firebase'
import React, { Component } from "react"



//All functions used with GetDevice pull from either Firebase and or the SEADS server
//Thus they are asynchronous. When using the any of the functions, use a then statement to
//be sure that the values are getting grabed from the servers and not passed over
//EXAMPLE
// device.[ANY GET FUNCTION].then((local_variable_name) => {
//  if(local_variable_name){
//    *use data retrieved from function that is stored in local_variable_name*
//  }
//  });
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

    //Helper function used to get the SEADS Device ID from Firebase
    //userID is the Firebase uid that must be gotten before this function is called
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

    //Helper function that takes the id found from the fidID function
    //And get the index in which the SEADS device is in the SEADS server list
    //This function MUST be called after findID
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

    //Helper function that uses the index retrieved from findIndex and pulls
    //the live data and time from the SEADS server
    //This function must be called after findIndex
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

    //Main getter method that makes a function call list using findID, findIndex, and findPower
    //Because data must be displayed in realtime, the app will not wait for the functions
    //to recieve data from the server before moving forward
    //getSeadsData, the function is written with 3 nested functions that wait for a return back from
    //the function(s) that are in side it.
    //Each return statement sends the value from the function up to the function that its nested in
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

    //Getter method that retrieve the email of the account from Firebase
    async getUserEmail(userID){
      if( !getFirebase().auth().currentUser) {
        return 'NO EMAIL, MUST LOG IN';
      }
      else {
        var ref = getFirebase().database().ref('users/' + userID + '/emailAlerts/email' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

    //Getter method that returns true or false if there is an ohmHour
    async isOhmHour(userID){
      if( !getFirebase().auth().currentUser) {
        return false;
      }
      else {
        var ref = getFirebase().database().ref('users/' + userID + '/isOhmHour' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

}
export default GetDevice;
