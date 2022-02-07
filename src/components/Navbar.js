import Identicon from "identicon.js";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import farmer from '../logo.png'





const Navbar = ({ account }) => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={farmer} width="30" height="30" className="d-inline-block align-top" alt="" />
                NFT Market Place
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link active" href="#">Home</Link>
                <Link to="/SellDigital" className="nav-link" href="#">Sell Digital Asset</Link>
                <Link to="/MyDigital" className="nav-link" href="#">My Digital Asset</Link>
                <Link to="/CreatorDashboard" className="nav-link" href="#">Creator Dashboard</Link>
                    
                </div>
            </div>

                <ul className="navbar-nav px-3">
                <li className="text-white">
                  <small className="text-secendary">
                        {account}
                      {account && <img className="ml-2"
                            width="30"
                            height="30"
                            alt="image"
                            src={`data:image/png;base64,${new Identicon(account, 30).toString()}`} />}
                    </small>
                </li>
            </ul>
        </nav>

        // <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        //     <a
        //         className="navbar-brand col-sm-3 col-md-2 mr-0"
        //         href="#"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //     >
        //         <img src={farmer} width="30" height="30" className="d-inline-block align-top" alt="" />
        //         NFT Market Place
        //     </a>

            // <ul className="navbar-nav">
            //     <li className="nav-item">
            //         <Link to="/" className="nav-link" href="#">Home</Link>
            //     </li>
            //     <li className="nav-item">
            //         <Link to="/SellDigital" className="nav-link" href="#">Sell Digital Asset</Link>
            //     </li>
            //     <li className="nav-item">
            //         <Link to="/MyDigital" className="nav-link" href="#">My Digital Asset</Link>
            //     </li>
            //     <li className="nav-item">
            //         <Link to="/CreatorDashboard" className="nav-link" href="#">Creator Dashboard</Link>
            //     </li>
            // </ul>

        //     <ul className="navbar-nav px-3">
        //         <li className="text-white">
        //             <small className="text-secendary">
        //                 {account}
        //                 {account && <img className="ml-2"
        //                     width="30"
        //                     height="30"
        //                     alt="image"
        //                     src={`data:image/png;base64,${new Identicon(account, 30).toString()}`} />}
        //             </small>
        //         </li>
        //     </ul>
        // </nav>

    );
}


export default Navbar;