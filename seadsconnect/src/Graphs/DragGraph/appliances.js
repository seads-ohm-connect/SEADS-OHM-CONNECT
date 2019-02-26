//Appliance list for getting power and money cost for each appliance
//that would be used in a household and cause a reasonable enough impact
//Appliances class is used for training graph and simulation pages as a
//stand in for currently dissagregated data. 
class Appliances {

  var electricFurnace = {
    kWh: 10.5;
    priceEstimate: 1.16
  }

  var centralAirconditioning = {
    kWh: 3.0;
    priceEstimate: 0.33
  }

  var windowAC120v = {
    kWh: 0.73;
    priceEstimate: 0.08;
  }

  var windowAC240v = {
    kWh: 1.8;
    priceEstimate: 0.20;
  }

  var electricWaterHeater = {
    kWh: 0.61;
    priceEstimate: 0.16 ;
  }

  var oven = {
    kWh: 2.3;
    priceEstimate: 0.25;
  }

  var dishwasher = {
    kWh: 1.58;
    priceEstimate: 0.18;
  }

  var fridge = {
    kWh: 0.07;
    priceEstimate: 0.01;
  }

  var computer = {
    kWh: 0.15;
    priceEstimate: 0.02;
  }

  var washingMachineWarm = {
    kWh: 2.3;
    priceEstimate: 0.25;
  }

  var washingMachineHot = {
    kWh: 6.3;
    priceEstimate: 0.69;
  }

  var dryer = {
    kWh: 3.0;
    priceEstimate: 0.34;
  }

  var hairDryer = {
    kWh: 1.5;
    priceEstimate: 0.17;
  }

}
