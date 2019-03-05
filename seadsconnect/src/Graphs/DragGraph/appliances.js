//Appliance list for getting power and money cost for each appliance
//that would be used in a household and cause a reasonable enough impact
//Appliances class is used for training graph and simulation pages as a
//stand in for currently dissagregated data.
class Appliances {
  constructor(props){

    this.electricFurnace = {
      kWh: 10.5,
      priceEstimate: 1.16
    }
    this.centralAirconditioning = {
      kWh: 3.0,
      priceEstimate: 0.33
    }

    this.windowAC120v = {
      kWh: 0.73,
      priceEstimate: 0.08
    }

    this.windowAC240v = {
      kWh: 1.8,
      priceEstimate: 0.20
    }

    this.electricWaterHeater = {
      kWh: 0.61,
      priceEstimate: 0.16
    }

    this.oven = {
      kWh: 2.3,
      priceEstimate: 0.25
    }

    this.dishwasher = {
      kWh: 1.58,
      priceEstimate: 0.18
    }

    this.fridge = {
      kWh: 0.07,
      priceEstimate: 0.01
    }

    this.computer = {
      kWh: 0.15,
      priceEstimate: 0.02
    }

    this.washingMachineWarm = {
      kWh: 2.3,
      priceEstimate: 0.25
    }

    this.washingMachineHot = {
      kWh: 6.3,
      priceEstimate: 0.69
    }

    this.dryer = {
      kWh: 3.0,
      priceEstimate: 0.34
    }

    this.hairDryer = {
      kWh: 1.5,
      priceEstimate: 0.17
    }
  }
}
export default Appliances
