import React, { Component } from "react"
import ProgressBar from 'react-bootstrap/ProgressBar'



export default class Thresholdbar extends Component {

    constructor(props) {
        super(props);

    }

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
			  <ProgressBar animated striped variant="success" now={this.clamp(this.normalizedValue(), 0, this.props.thresholds)} key={1} />
			  <ProgressBar animated variant="warning" now={this.clamp(this.normalizedValue(), this.props.thresholds, 2 * this.props.thresholds)} key={2} />
			  <ProgressBar animated striped variant="danger" now={this.clamp(this.normalizedValue(), 2 * this.props.thresholds, 3 * this.props.thresholds + 1)} key={3} />
			</ProgressBar>
    	)
    }
}