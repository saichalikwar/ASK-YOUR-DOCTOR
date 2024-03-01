import React, { Component } from 'react';
import AppointmentService from '../service/AppointmentService';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

class BookSlotForPatient extends Component {

    componentDidMount() {

        if (sessionStorage.getItem("role") == null) {
            window.location = "/"


        }
    }


    constructor(props) {
        super(props)

        this.state = {
            slots: [],
            message: null,
            loading: false
        }

        this.confirmSlot = this.confirmSlot.bind(this);
    }

    confirmSlot = (doctorId, patientId, time) => {

        this.setState({ loading: true });

        //Faking API call here

        AppointmentService.bookAppointmentForPatient(doctorId, patientId, time.replace("T", " "))
            .then(response => {
                this.setState({
                    slots: response.data,
                    message: "Appointment Confirmed!!!",
                    loading: true
                })
                toast.success(this.state.message, { autoClose: 3000, position: toast.POSITION.TOP_RIGHT });
                this.setState({ loading: false });
                // alert(this.state.message);
                //Faking API call here
                setTimeout(() => {
                    this.props.history.push('/patientDashboard');
                }, 3000);


            })
            .catch(error => {
                console.error("in err ", error.response.data);

                this.setState({ loading: true });
                toast.error(error.response.data.message, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT });
            });
    }

    render() {
        let { doctor, time } = this.props.location.state;
        let patient = JSON.parse(sessionStorage.getItem("patient"));

        return (
            <>
                <div className="container my-4">
                    <button className="btn btn-secondary my-2 offset-10" onClick={() => { this.props.history.push('/patientDashboard') }} style={{ minWidth: "13vw" }}>Back To Dashboard</button>
                    <h3>Confirm Appointment</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th className="visually-hidden">Patient ID</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Area</th>
                                <th>Consultaion Fee</th>
                                <th>Specialization</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="visually-hidden">{patient.userId}</td>
                                <td>{patient.userFirstName}</td>
                                <td>{`${'Dr. ' + doctor.firstName + ' ' + doctor.lastName}`}</td>
                                <td>{`${doctor.area + ', ' + doctor.city}`}</td>
                                <td>{doctor.fees}</td>
                                <td>{doctor.specialization}</td>
                                <td>{moment(Date.parse(time)).format("LT")}</td>
                                <td>
                                    <button
                                        className="btn btn-success" onClick={() => { this.confirmSlot(doctor.id, patient.userId, time) }}>
                                        {this.state.loading && (
                                            <i
                                                className="fas fa-spinner"
                                                style={{ marginRight: "5px" }}
                                            />
                                        )}
                                        {this.state.loading && <span>Booking</span>}
                                        {!this.state.loading && <span>Confirm</span>}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ToastContainer />
                </div>
            </>
        )
    }
}

export default BookSlotForPatient
