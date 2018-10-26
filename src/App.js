import React, { Component } from 'react';
import Targets from './components/targets'
import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        const maxWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const maxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.state = {
            targets: [],
            targetsHit: 0,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            roundTimer: null
        }
    }

    componentDidMount = () => {
        const timer = setInterval(() => {
            this.createTarget();
        }, 1000);

        this.setState({
            roundTimer: timer
        })
    }

    hitTarget = (targetId) => {
        var newTargets = [...this.state.targets];
        newTargets.splice(targetId, 1);

        this.setState({
            targets: newTargets,
            targetsHit: this.state.targetsHit + 1
        })
    }

    createTarget = () => {
        const randomWidth = Math.floor(Math.random() * this.state.maxWidth) + 1;
        const randomHeight = Math.floor(Math.random() * this.state.maxHeight) + 1;

        this.setState({
            targets: [...this.state.targets, {
                top: randomHeight,
                left: randomWidth
            }]
        })
    }

    render() {
        if(this.state.targets.length >= 10)
        {
            clearInterval(this.state.roundTimer);
            return (
                <div className="app">
                    <h1>Sorry, You lose</h1>
                </div>
            )
        }
        else
        {
            return (
                <div className="app">
                    <div className="scoreboard">
                        <div className="score">Targets Hit: {this.state.targetsHit}</div>
                        <div className="score">Targets Active: {this.state.targets.length}/10</div>
                    </div>
                    <Targets hitTarget={this.hitTarget} targets={this.state.targets} />
                </div>
            );
        }
    }
}

export default App;
