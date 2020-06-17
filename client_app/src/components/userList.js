import React from 'react';
import axios from 'axios';
import {Table, Button, Label} from 'reactstrap';
import { createBrowserHistory } from "history";
import { Route , withRouter} from 'react-router-dom';

import '../App.css';

const history = createBrowserHistory();

class userLists extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        axios.get('http://localhost:3001/users')
            .then((response) => {
                const { data } = response;
                this.setState({users: data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render(){
        return(
            <div className="mx-4">
                <div>
                    <Route render={({ history}) => (
                        <Button className="float-right" size="lg" color="primary" style={{padding: '5px'}}  onClick={() => { history.push('/add-user') }}>Add User</Button>
                    )} />
                    <br></br>
                    <br></br>
                    <br></br>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Nationality</th>
                            <th>DOB</th>
                            <th>Education</th>
                            <th>Mode Of Contact</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((data,index)=>{
                            return (<tr key={data.id}>
                                <th scope="row" >{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.gender}</td>
                                <td>{data.phone}</td>
                                <td>{data.email}</td>
                                <td>{data.address}</td>
                                <td>{data.nationality}</td>
                                <td>{data.dateOfBirth}</td>
                                <td>{data.educationBackground}</td>
                                <td>{data.modeOfContact}</td>
                                <td>{data.description}</td>
                            </tr>)
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}


export default userLists;
