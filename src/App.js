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
            targetsHitLevel: 0,
            targetsHitTotal: 0,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            roundLevel: 1,
            roundTimer: null
        }

        this.levels = [
            0, //offset index to 1
            1000,
            800,
            600,
            400,
            200
        ]
    }

    componentDidMount = () => {
        this.setupRound();
    }

    setupRound = () => {
        if(this.state.roundTimer) { clearInterval(this.state.roundTimer); }

        const timer = setInterval(() => {
            this.createTarget();
        }, this.levels[this.state.roundLevel]);

        this.setState({
            roundTimer: timer
        })
    }

    hitTarget = (targetId) => {
        var newTargets = [...this.state.targets];
        newTargets.splice(targetId, 1);

        this.setState({
            targets: newTargets,
            targetsHitLevel: this.state.targetsHitLevel + 1,
            targetsHitTotal: this.state.targetsHitTotal + 1
        })

        if(this.state.targetsHitLevel === 10)
        {
            this.setState({
                roundLevel: this.state.roundLevel + 1,
                targetsHitLevel: 0
            })
        }

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
                    <h3>You did score {this.state.targetsHitTotal} though!</h3>
                </div>
            )
        }
        else
        {
            return (
                <div className="app">
                    <div className="scoreboard">
                        <div className="level">level: {this.state.roundLevel}</div>
                        <div className="score">Level Targets Hit: {this.state.targetsHitLevel}</div>
                        <div className="score">Total Targets Hit: {this.state.targetsHitTotal}</div>
                        <div className="score">Targets Active: {this.state.targets.length}/10</div>
                    </div>
                    <Targets hitTarget={this.hitTarget} targets={this.state.targets} />
                </div>
            );
        }
    }
}

export default App;
