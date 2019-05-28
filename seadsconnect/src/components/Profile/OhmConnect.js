import getFirebase from '../Firebase'
import React, { Component } from "react"

var d3 = require("d3");


class GetOhmData {
    constructor(props){
      this.state = {
        isOhmHour: false,
        ohmHourDate: "",
        startTime: "",
        endTime: "",
        pkh: 0,
        threshold: 0
      }
    }

    async getOhmDate(uid) {
      if( !getFirebase().auth().currentUser) {
        return "No OhmHour";
      }
      else {
        var ref = getFirebase().database().ref('users/' + uid + '/ohmDate' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

    async getOhmStartTime(uid) {
      if( !getFirebase().auth().currentUser) {
        return "No OhmHour";
      }
      else {
        var ref = getFirebase().database().ref('users/' + uid + '/ohmHourStart' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

    async getOhmEndTime(uid) {
      if( !getFirebase().auth().currentUser) {
        return "No OhmHour";
      }
      else {
        var ref = getFirebase().database().ref('users/' + uid + '/ohmHourEnd' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

    async getOhmHourThreshold(uid) {
      if( !getFirebase().auth().currentUser) {
        return "No OhmHour";
      }
      else {
        var ref = getFirebase().database().ref('users/' + uid + '/threshold' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

    async getOhmHourPoints(uid) {
      if( !getFirebase().auth().currentUser) {
        return "No OhmHour";
      }
      else {
        var ref = getFirebase().database().ref('users/' + uid + '/ohmHourPoints' );
        return ref.once("value").then(function(snapshot) {
          if(snapshot.exists()) {
            return snapshot.val();
          }
        });
      }
    }

}

export default GetOhmData;
