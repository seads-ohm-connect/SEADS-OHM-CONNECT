import React, { Component } from "react"
import ProgressBar from 'react-bootstrap/ProgressBar'


export default () => (
    <Thresholdbar /> 
)


class Thresholdbar extends Component {
	constructor(props) {
    	super(props);

    }

    value = 100;
 	max   = 5000;
 	//changes every 33 percent
 	thresholds = 33;

    setValue = (n_value) => {
    	//take the percentage and multiply by 100
    	this.value = (n_value / this.max) * 100;
    }

    clamp(num, min, max) {
  		return num <= min ? 0 : num >= max ? (max - min) : (num - min);
	}


    render() {

    	return (
		    <ProgressBar>
			  <ProgressBar animated striped variant="success" now={this.clamp(this.value, 0, this.thresholds)} key={1} />
			  <ProgressBar animated variant="warning" now={this.clamp(this.value, this.thresholds, 2 * this.thresholds)} key={2} />
			  <ProgressBar animated striped variant="danger" now={this.clamp(this.value, 2 * this.thresholds, 3 * this.thresholds + 1)} key={3} />
			</ProgressBar>
    	)
    }
}