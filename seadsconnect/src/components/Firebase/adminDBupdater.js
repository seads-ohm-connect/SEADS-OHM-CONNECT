import React, { Component } from "react"
import getFirebase from '../firebase'

var d3 = require("d3");

export default class Updater extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		time: 30000, //updates every 30 seconds
    	}
    }

	componentDidMount() {
        this.interval = setInterval(() => this.updateServer(), this.state.time);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateServer() {
    	if (!getFirebase().auth().currentUser)
    		return

    	var db = getFirebase().database();
        var userId = getFirebase().auth().currentUser.uid;
        var liveUpdateURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");

        //admin will be able to read ever userId
        db.ref('/users/').once('value', snapshot => {
        	if (snapshot.exists()) {
        		//for each userid write the current watt data.
        		//will need to update this function to only  write if they have a seads device.
        		snapshot.forEach(function(_child){
            		var _userId = _child.key;
            		d3.json(liveUpdateURL).then( (liveDataa) => {
            			var watts = liveDataa.DataPoints[0].Power;
            			db.ref('/users/' + _userId + '/currentUsage/').set({
            				realTimeWatts: watts
            			});
            		});
            	});
        	}
        });

    	//alert("test")
    }

    render() {
    	return(<div />);
    }
}