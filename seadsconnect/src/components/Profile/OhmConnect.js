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
          else{
            var date = new Date();
            var month = date.getUTCMonth() + 1; //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();
            return month + "/" + day + "/" + year;
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
