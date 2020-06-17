import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import "../App.css";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class AddUser extends Component {
    initialState = {
        name: "",
        email: "",
        phone: "",
        address: "",
        nationality: "",
        gender: "",
        dateOfBirth: "",
        educationBackground: "",
        modeOfContact: "",
        description: "",
        formErrors: {
            name: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            nationality: "",
            dateOfBirth: "",
            educationBackground: "",
            modeOfContact: "",
            description: "",
        }
    };

    state = this.initialState;

    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        let formErrors = {...this.state.formErrors};
        this.setState({formErrors, [name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {formErrors, ...payload} = this.state;
        const stateKey = Object.keys(payload);
        for (let i = 0; i < stateKey.length; i++) {
            if (stateKey[i] === "email") {
                if (!(emailRegex.test(this.state.email))) {
                    return toast.error("Invalid Email");
                }
            }

            if (!(this.state.dateOfBirth)) {
                return this.setState({formErrors: {dateOfBirth: "Date of birth is required"}})
            }

            if (this.state[stateKey[i]] === "") {
                return this.setState({formErrors: {[stateKey[i]]: `Please enter the ${stateKey[i]}`}});
            }

            // Removing the comma from the payloads
            payload[stateKey[i]] = payload[stateKey[i]].replace(/,/g, '');
        }

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            response.json().then((data) => {
                if (data.message && (response.status !== 200 || response.status !== 201)) {
                    toast.error(data.message);
                } else {
                    toast.success("User created successfully !!");
                    this.setState(() => this.initialState)
                }
            });
        }).catch(error => {
            console.log("error", error);
        });

    };


    render() {
        const {formErrors} = this.state;
        return (
            <Form className="mx-4" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" value={this.state.name}
                           onChange={this.handleChange}/>
                    {formErrors.name && (
                        <span className="errorMessage">{formErrors.name}</span>
                    )}
                    <br/>
                </FormGroup>


                <FormGroup tag="fieldset">
                    <legend>Gender</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="gender" value="Male" onChange={this.handleChange}/>Male
                            <br></br>
                            <Input type="radio" name="gender" value="Female" onChange={this.handleChange}/>Female
                            <br></br>
                            {formErrors.gender && (
                                <span className="errorMessage">{formErrors.gender}</span>
                            )}
                            <br></br>
                        </Label>
                    </FormGroup>
                </FormGroup>

                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="number" name="phone" value={this.state.phone}
                           onChange={this.handleChange}/>
                    {formErrors.phone && (
                        <span className="errorMessage">{formErrors.phone}</span>
                    )}
                    <br/>
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" value={this.state.email}
                           onChange={this.handleChange}/>
                    {formErrors.email && (
                        <span className="errorMessage">{formErrors.email}</span>
                    )}
                    <br/>
                </FormGroup>

                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" value={this.state.address}
                           onChange={this.handleChange}/>
                    {formErrors.address && (
                        <span className="errorMessage">{formErrors.address}</span>
                    )}
                    <br/>
                </FormGroup>

                <FormGroup>
                    <Label for="nationality">Nationality</Label>
                    <Input type="text" name="nationality" value={this.state.nationality}
                           onChange={this.handleChange}/>
                    {formErrors.nationality && (
                        <span className="errorMessage">{formErrors.nationality}</span>
                    )}
                    <br/>
                </FormGroup>

                <FormGroup>
                    <Label for="dateOfBirth">Date of birth</Label>
                    <Input
                        type="date"
                        name="dateOfBirth"
                        value={this.state.dateOfBirth}
                        onChange={this.handleChange}
                    />
                    {formErrors.dateOfBirth && (
                        <span className="errorMessage">{formErrors.dateOfBirth}</span>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="educationBackground">Education Background</Label>
                    <Input type="text" name="educationBackground" value={this.state.educationBackground}
                           onChange={this.handleChange}/>
                    {formErrors.educationBackground && (
                        <span className="errorMessage">{formErrors.educationBackground}</span>
                    )}
                    <br/>
                </FormGroup>

                <FormGroup tag="fieldset">
                    <legend>Mode of Contact</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="modeOfContact" value="email" onChange={this.handleChange}/>Email
                            <br></br>
                            <Input type="radio" name="modeOfContact" value="phone" onChange={this.handleChange}/>Phone
                            <br></br>
                            <Input type="radio" name="modeOfContact" value="none" onChange={this.handleChange}/>None
                            <br></br>
                            {formErrors.modeOfContact && (
                                <span className="errorMessage">{formErrors.modeOfContact}</span>
                            )}
                            <br></br>
                        </Label>
                    </FormGroup>
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" value={this.state.description}
                           onChange={this.handleChange}/>
                    {formErrors.description && (
                        <span className="errorMessage">{formErrors.description}</span>
                    )}
                    <br/>
                </FormGroup>
                <Button color="primary">Submit</Button>
                <br></br>
                <br></br>
                <ToastContainer/>
            </Form>
        )
    }

}

export default AddUser;