import React, { Component } from 'react'

export default class Target extends Component {

    hitTarget = () => {
        target
    }

    render() {
        const targets = this.props.targets;
        if(targets.length === 0) return null;

        return (
            <div className="targets">
                {
                    targets.map((element, index) => {
                        return (
                            <div key={index} className="target" onClick={this.hitTarget} style={{ top: element.top + "px", left: element.left + "px" }}></div>
                        )
                    })
                }
            </div>
        )
    }
}
