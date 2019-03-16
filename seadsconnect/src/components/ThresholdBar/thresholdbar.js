import React, { Component } from "react"
import ProgressBar from 'react-bootstrap/ProgressBar'



export default class Thresholdbar extends Component {

 	max   = 5000;
 	//changes every 33 percent
 	thresholds = 33;

    normalizedValue() {
    	//take the percentage and multiply by 100
    	return (this.props.value / this.props.max) * 100;
    }

    clamp(num, min, max) {
  		return num <= min ? 0 : num >= max ? (max - min) : (num - min);
	}


    render() {
    	return (
		    <ProgressBar>
			  <ProgressBar animated striped variant="success" now={this.clamp(this.props.value, 0, this.thresholds)} key={1} />
			  <ProgressBar animated variant="warning" now={this.clamp(this.props.value, this.thresholds, 2 * this.thresholds)} key={2} label={`${this.props.value}`} />
			  <ProgressBar animated striped variant="danger" now={this.clamp(this.props.value, 2 * this.thresholds, 3 * this.thresholds + 1)} key={3} />
			</ProgressBar>
    	)
    }
}