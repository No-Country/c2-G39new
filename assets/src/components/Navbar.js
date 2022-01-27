import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import MenuItems from "./navbar/MenuItems.js"
import './Styles/navbar.css'
//import {Button} from '../../../src/elements/button/button.js'

class Navbar extends Component {

    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="navbarItems">
                <Link to="/"><h1 className="navbar-logo">Crypto check</h1></Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/contact">About us</Link>
                    
                    
                    {/* {MenuItems.map((item, index) => {
                return (
                    <li key={index}> 
                        <a className={item.cName} href={item.url}>
                            {item.title}
                        </a>
                    </li>
                        )
                    })} */}
                </ul>
                    {/* <Button>Sign up</Button> */}
            </nav>
)}}

export default Navbar;