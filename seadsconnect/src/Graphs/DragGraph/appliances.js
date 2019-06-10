//Appliance list for getting power and money cost for each appliance
//that would be used in a household and cause a reasonable enough impact
//Appliances class is used for training graph and simulation pages as a
//stand in for currently dissagregated data.


//need to get more accurate values...
//we originally got the values in KwH then we decided to use watts so we
//just multiplied by 1000... seems to high
class Appliances {

    static electricFurnace = {
      name: "Electric Furnace",
      watts: 10.5 * 1000,
      priceEstimate: 1.16
    }

    static centralAirconditioning = {
      name: "Central Airconditioning",
      watts: 3.0 * 1000,
      priceEstimate: 0.33
    }

    static windowAC120v = {
      name: "Window AC 120v",
      watts: 0.73 * 1000,
      priceEstimate: 0.08
    }

    static windowAC240v = {
      name: "Window AC 240v",
      watts: 1.8 * 1000,
      priceEstimate: 0.20
    }

    static electricWaterHeater = {
      name: "Electric Water Heater",
      watts: 0.61 * 1000,
      priceEstimate: 0.16
    }

    static oven = {
      name: "Oven",
      watts: 2.3 * 1000,
      priceEstimate: 0.25
    }

    static dishwasher = {
      name: "Dishwasher",
      watts: 1.58 * 1000,
      priceEstimate: 0.18
    }

    static fridge = {
      name: "Fridge",
      watts: 0.07 * 1000,
      priceEstimate: 0.01
    }

    static computer = {
      name: "Computer",
      watts: 0.15 * 1000,
      priceEstimate: 0.02
    }

    static washingMachineWarm = {
      name: "Washing Machine (Warm)",
      watts: 2.3 * 1000,
      priceEstimate: 0.25
    }

    static washingMachineHot = {
      name: "Washing Machine (Hot)",
      watts: 6.3 * 1000,
      priceEstimate: 0.69
    }

    static dryer = {
      name: "Dryer",
      watts: 3.0 * 1000,
      priceEstimate: 0.34
    }

    static hairDryer = {
      name: "Hair Dryer",
      watts: 1.5 * 1000,
      priceEstimate: 0.17
    }
}



export default Appliances;
