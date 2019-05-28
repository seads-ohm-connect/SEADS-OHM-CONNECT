import React, { Component } from "react"
import ProgressBar from 'react-bootstrap/ProgressBar'



export default class Thresholdbar extends Component {

    normalizedValue(value, threshold) {
    	//take the percentage and multiply by 100
        if (value <= 0 || threshold <= 0)
            return 0;

        var percentage = value >= threshold ? value / threshold : (1 / (value / threshold));
    	return this.clamp(value, 0, threshold);
    }

    clamp(num, min, max) {
  		return num <= min ? 0 : num >= max ? max : num;
	}


    render() {

        let val1 = Math.round(this.normalizedValue(this.props.value,  this.props.threshold1) / this.props.max * 100);
        let val2 = Math.round(this.normalizedValue(this.props.value - this.props.threshold1, this.props.threshold2) / this.props.max * 100);
        let val3 = Math.round(this.normalizedValue(this.props.value - this.props.threshold2 - this.props.threshold1, this.props.threshold3) / this.props.max * 100);


    	return (
		    <ProgressBar>
			  <ProgressBar animated striped variant="success" now={val1} key={1} label={val1 > 0 ? val1 + "%" : ""} />
			  <ProgressBar animated variant="warning" now={val2} key={2} label={val2 > 0 ? val2 + "%" : ""} />
			  <ProgressBar animated striped variant="danger" now={val3} key={3}  label={val3 > 0 ? val3 + "%" : ""}/>
			</ProgressBar>
    	)
    }
}