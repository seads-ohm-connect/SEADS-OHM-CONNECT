import React, { Component } from "react"
import GetDevice from "../Profile/getDeviceID"

var d3 = require("d3");


//Class to track the energy usage of a single appliance when prompted by the user.
//When button is pressed on the on training page, energy difference will be tracked
//and atributed to the appliance selected by the user in the dropdown menue
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
        console.log("in start function")
        this.tracking = true
        this.beforeEnergy = livePower
      }
    }

    track(livePower) {
      if(this.tracking){
          console.log(livePower)
          var dif = livePower - this.beforeEnergy
          console.log(dif)
          this.totalEnergy = this.totalEnergy + dif
          this.samples = this.samples + 1
          return dif;
      }
      return 0;
    }

    endTracking() {
      if(this.tracking){
        this.tracking = false
        var avrg = (this.totalEnergy / this.samples)
        this.averageUse = avrg
        this.samples = 0
        this.totalEnergy = 0
      }
    }

}
export default TrackAppliance;
