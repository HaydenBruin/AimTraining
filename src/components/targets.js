import React, { Component } from 'react'

export default class Targets extends Component {

    render() {
        const targets = this.props.targets;
        if(targets.length === 0) return null;

        return (
            <div className="targets">
                {
                    targets.map((element, index) => {
                        return (
                            <div key={index} className="target" onClick={() => this.props.hitTarget(index)} style={{ top: element.top + "px", left: element.left + "px" }}></div>
                        )
                    })
                }
            </div>
        )
    }
}
