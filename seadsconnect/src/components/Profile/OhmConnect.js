import getFirebase from '../Firebase'
import React, { Component } from "react"

var d3 = require("d3");

//Class for retreiving data from Firebase related to OhmConnect
//Each function is asynchronous and functions should be used in as exampled:
// *GetOhmData object*.[ANY GET FUNCTION].then((local_variable_name) => {
//  if(local_variable_name){
//    *use data retrieved from function that is stored in local_variable_name*
//  }
//  });
//
//Firebase references are able to be changed if the location of each of the
//OhmConnect related items are moved.
//There is currently only functions that retrieve a single Data feild.
//A function that combines these together to get all the data in one call
//can be made if the individual calls become too cumbersome.
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
