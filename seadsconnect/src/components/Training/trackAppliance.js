import React, { Component } from "react"
import GetDevice from "../Profile/getDeviceID"

var d3 = require("d3");


//Class to track the energy usage of a single appliance when prompted by the user.
//Tracking is done by taing a snapshot of current usage when startTracking is called
//track function is put into a constant update function and is called repeatedly
//untill endTracking is called, and the tracker is stopped.
//variable this.tracking is used to determine if the tracker is in tracking mode or not
//
//guessAppliance is used when energy usage is over durring an OhmHour. This function
//will be called to determine which device was the cause of the overage
class TrackAppliance {
    constructor(props){

      this.totalEnergy = 0
      this.beforeEnergy = 0
      this.samples = 0
      this.tracking = false
      this.averageUse = 0
    }

    startTracking(livePower) {
      if(!this.tracking){
        this.tracking = true
        this.beforeEnergy = livePower
      }
    }

    track(livePower) {
      if(this.tracking){
          var dif = livePower - this.beforeEnergy
          this.totalEnergy = this.totalEnergy + dif
          this.samples = this.samples + 1
          return dif;
      }
      return 0;
    }

    endTracking() {
      if(this.tracking){
        var avrg = (this.totalEnergy / this.samples)
        this.tracking = false
        this.averageUse = avrg
        this.samples = 0
        this.totalEnergy = 0
      }
    }

    getAverage() {
      return this.averageUse;
    }

    guessAppliance(snapshot, val) {
      var apps = snapshot.child('appliances').val();
      var guess = "";
      var min = val;
      for (var machine in apps) {
        for (var fields in apps[machine]) {
          if (fields === 'watts') {
            if (Math.abs(val - apps[machine][fields]) <= min) {
              min = apps[machine][fields]
              guess = machine;
            }
          }
        }
      }
      return guess;
    }

}
export default TrackAppliance;
