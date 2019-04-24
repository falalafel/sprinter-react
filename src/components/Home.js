import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>
                        Sprinter Web App
                    </h1>
                        <Link className="App-link" to='/dashboard'>Dashboard</Link>
                </header>
            </div>
        )
    }
}

export default Home;
