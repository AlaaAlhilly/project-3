import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class InNavbar extends Component {
  render() {
    return (
        <header className="site-header">
        <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
            <div className="container">
                <Link className="navbar-brand mr-4" to="/">Snippers</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle"
                    aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggle">
                    <div className="navbar-nav mr-auto">
                        <Link className="nav-item nav-link" to="/">Home</Link>
                    </div>
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/new-snippet">Create Snippet</Link>
                        <Link className="nav-item nav-link" to="/profile">Profile</Link>
                        <Link className="nav-item nav-link" to="/" onClick={this.props.logout}>Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    )
  }
}
