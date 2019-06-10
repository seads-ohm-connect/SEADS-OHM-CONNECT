/*
    This component updates the power usage for all of the users on firebase.
    An admin must be logged into the home page for it to update.
    Admin keys need to be given to an account from firebase.

*/
import React, { Component } from "react"
import getFirebase from '../Firebase'
import GetDevice from "../Profile/getDeviceID"
import sendMailAlert, { sendEmailWarning } from "../Alerts/email"
import sendPhoneAlert, { sendPhoneWarning } from "../Alerts/sms"
import TrackAppliance from "../training/trackAppliance"
import Keys from '../../../keys'

var d3 = require("d3");


export default class Updater extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		time: 1500, //updates every 30 seconds
            liveData: 0,
            liveTime: 0
    	}

        this.adminId = Keys.ADMIN_KEY; //user  generated id from firebase

        this.tracker = new TrackAppliance();
        this.appliance = "";
    }

    //call the update every time interval 
	componentDidMount() {
        this.interval = setInterval(() => this.updateServer(), this.state.time);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //takes care of updated power usage and sending emails.
    updateServer() {

    	if (!getFirebase().auth().currentUser)
    		return

    	var db = getFirebase().database();
        var userId = getFirebase().auth().currentUser.uid;
        var liveUpdateURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");

        if (userId !== this.adminId)
            return;

        var self = this;
        //admin will be able to read ever userId
        db.ref('/users/').once('value').then(function(snapshot){

        	if (snapshot.exists()) {
        		//for each userid write the current watt data.
        		//will need to update this function to only  write if they have a seads device.
        		snapshot.forEach((_child) => {
            		var _userId = _child.key;
            		d3.json(liveUpdateURL).then( (liveDataa) => {
                        var device = new GetDevice();
                        device.getSeadsData(_userId).then((powTime) => {

                            if(powTime){
                                device.liveData = powTime[0];
                                device.liveTime = powTime[1];

                                if (device.liveData < 0) {
                                    return;
                                }

                                var previousPower = snapshot.child(_userId).val()['currentUsage']['realTimeWatts'];

                                self.checkToSend(self, device, db, _userId, device.liveData, previousPower);

                                db.ref('/users/' + _userId + '/currentUsage/').set({
                                    realTimeWatts: device.liveData
                                });
                            }
                        });
            		});
            	});
        	}
        });
    }

    //check to see if an alert is needed to be sent
    checkToSend(self, device, db, userId, currentWatt, previousPower){
        //check to see if it is the users ohm hour
        db.ref('/users/' + userId).once('value').then(function(snapshot) {
            if (snapshot.exists()) {
                self.overThreshold(device, snapshot, db, userId, currentWatt, previousPower);
                self.ohmHourApproaching(device, snapshot, db, userId);
            }
        });
    }


    //sends an alert if energy usage for a specific user is over a threshold
    overThreshold(device, snapshot, db, userId, currentWatt, previousPower) {
        if (snapshot.child('isOhmHour').val() === true) {
            //check to see if their current watt is above their threshold.
            var threshold = snapshot.child('threshold').val();
            if (threshold < currentWatt) {
                //send email
                device.getUserEmail(userId).then((emails) => {
                    this.appliance = this.tracker.guessAppliance(snapshot, currentWatt - previousPower);
                    sendMailAlert(emails, this.appliance);
                    //instead of updating ohm hour we will update a timestamp on last email sent
                    db.ref('/users/' + userId).update({
                        isOhmHour: false,
                        applianceOver: this.appliance
                    });
                });

                //send sms
                device.getUserPhone(userId).then((numbers) => {
                    this.appliance = this.tracker.guessAppliance(snapshot, currentWatt - previousPower);
                    sendPhoneAlert(numbers, this.appliance);
                    //instead of updating ohm hour we will update a timestamp on last sms sent
                    db.ref('/users/' + userId).update({
                        isOhmHour: false,
                        applianceOver: this.appliance
                    });
                });
            }
        }
    }

    //sends an alert if an OhmHour is approaching for a specific user.
    ohmHourApproaching(device, snapshot, db, userId) {
        var notifyTime = snapshot.child('notifyInAdvanceEmail').val();
        if (notifyTime > 0) {
            var currentTime = 0;
            //going to want to convert ohmdate into minutes
            console.log(notifyTime + " " + currentTime + " " + snapshot.child('ohmDate').val())
            if (snapshot.child('ohmDate').val() === currentTime + notifyTime) {
                device.getUserEmail(userId).then((emails) => {
                    var hr  = Math.floor(notifyTime / 60);
                    var min = notifyTime % 60;
                    sendEmailWarning(emails, hr, min);
    
                    //instead of updating ohm hour we will update a timestamp on last email sent
                    db.ref('/users/' + userId).update({
                        notifyInAdvanceEmail: 0
                    });
                });
            }
        }
    }


    render() {
    	return(null);
    }
}
