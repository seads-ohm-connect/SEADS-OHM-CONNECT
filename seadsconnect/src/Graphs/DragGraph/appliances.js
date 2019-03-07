//Appliance list for getting power and money cost for each appliance
//that would be used in a household and cause a reasonable enough impact
//Appliances class is used for training graph and simulation pages as a
//stand in for currently dissagregated data.
class Appliances {

    static electricFurnace = {
      name: "Electric Furnace",
      kWh: 10.5,
      priceEstimate: 1.16
    }

    static centralAirconditioning = {
      name: "Central Airconditioning",
      kWh: 3.0,
      priceEstimate: 0.33
    }

    static windowAC120v = {
      name: "Window AC 120v",
      kWh: 0.73,
      priceEstimate: 0.08
    }

    static windowAC240v = {
      name: "Window AC 240v",
      kWh: 1.8,
      priceEstimate: 0.20
    }

    static electricWaterHeater = {
      name: "Electric Water Heater",
      kWh: 0.61,
      priceEstimate: 0.16
    }

    static oven = {
      name: "Oven",
      kWh: 2.3,
      priceEstimate: 0.25
    }

    static dishwasher = {
      name: "Dishwasher",
      kWh: 1.58,
      priceEstimate: 0.18
    }

    static fridge = {
      name: "Fridge",
      kWh: 0.07,
      priceEstimate: 0.01
    }

    static computer = {
      name: "Computer",
      kWh: 0.15,
      priceEstimate: 0.02
    }

    static washingMachineWarm = {
      name: "Washing Machine (Warm)",
      kWh: 2.3,
      priceEstimate: 0.25
    }

    static washingMachineHot = {
      name: "Washing Machine (Hot)",
      kWh: 6.3,
      priceEstimate: 0.69
    }

    static dryer = {
      name: "Dryer",
      kWh: 3.0,
      priceEstimate: 0.34
    }

    static hairDryer = {
      name: "Hair Dryer",
      kWh: 1.5,
      priceEstimate: 0.17
    }
}



export default Appliances;
