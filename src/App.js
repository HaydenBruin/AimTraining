import React, { Component } from 'react';
import Target from './components/target'
import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        const maxWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const maxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.state = {
            targets: [],
            maxWidth: maxWidth,
            maxHeight: maxHeight
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.createTarget();
        }, 1000)
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
        return (
            <div className="app">
                <Target targets={this.state.targets} />
            </div>
        );
    }
}

export default App;
