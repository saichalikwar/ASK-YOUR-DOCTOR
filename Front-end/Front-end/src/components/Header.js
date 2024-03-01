import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {

    let { title } = props;

    let role = (sessionStorage.getItem("role"));
    console.log(role);

    //window.location.reload();
    // useEffect(() => {

    //     const reloadCount = sessionStorage.getItem('reloadCount');
    //     if (reloadCount < 2) {
    //         sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //         window.location.reload();
    //     } else {
    //         sessionStorage.removeItem('reloadCount');
    //     }

    // }, []);



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-header">
                    <NavLink className="navbar-brand" to="/">{title}</NavLink>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    < li className="nav-item"><NavLink className="nav-link active" to="/">Home</NavLink></li>

                    {(role && role === "admin") ?
                        (< li className="nav-item"><NavLink className="nav-link active" to="/adminDashboard">My Dashboard</NavLink></li>)
                        : <></>
                    }
                    {(role && role === "doctor") ?
                        (< li className="nav-item"><NavLink className="nav-link active" to="/doctorDashboard"> My Dashboard</NavLink></li>)
                        : <></>
                    }
                    {(role && role === "patient") ?
                        (< li className="nav-item"><NavLink className="nav-link active" to="/patientDashboard"> My Dashboard</NavLink></li>)
                        : <></>
                    }
                    <li className="nav-item"><NavLink className="nav-link" to="/about">About Us</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact Us</NavLink></li>
                </ul>
            </div>
        </nav >
    )
}

