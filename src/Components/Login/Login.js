import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {Redirect, Route} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchLoginData, fetchRegisterData} from '../../Utils/utils';
import './Login.css';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect: false,
            loginUser: false,
            showError: false,
            errorMessage: ""
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.hideAfterSomeTime = this.hideAfterSomeTime.bind(this);
    }

    login(){
        if(this.state.username && this.state.password){
            fetchLoginData({ username: this.state.username, password : this.state.password })
            .then(data => {
                if(data.success){
                    sessionStorage.setItem('userData', data.userData._id + "," + data.userData.username);
                    this.setState({redirect : true});
                }
                else{
                    this.setState({showError: true});
                     this.setState({errorMessage: data.message});
                }
            });
        }else {
            // empty data
        }
    }
    register(){
        if(this.state.username && this.state.password){
            fetchRegisterData({ username: this.state.username, password : this.state.password })
            .then(data => {
                if(data.success){
                    sessionStorage.setItem('userData', data.userData._id + "," + data.userData.username);
                    this.setState({redirect : true});
               }
               else {
                   this.setState({showError: true});
                   this.setState({errorMessage: data.message});
               }
            });
        }
        else{
            // empty data 
        }
    }
    change(e){
        this.setState({[e.target.name]: e.target.value});
        this.setState({showError: false});
    }
    submit(e){
        e.preventDefault();
        if(this.state.loginUser){
            this.login();
        }else{
            this.register();
        }
    }
    hideAfterSomeTime(){
        setTimeout(() => {
            this.setState({
                showError: false
            });
          }, 2000);
    }
    render(){    
        
        if(this.state.redirect){
            return(
                <Route>
                    <Redirect to={'./home'}/>
                </Route>);
        }

        if(sessionStorage.getItem("userData")){
            return(
                <Route>
                    <Redirect to={'./home'}/>
                </Route>);
        }
        return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="login"><img src="eurocoin_64px.png" alt=""></img>MBank</Navbar.Brand>
                <Nav>
                    <Nav.Link href="about">Help</Nav.Link>
                </Nav>
            </Navbar>
            <img id="monopolbankImage"src="eurocoin_11.png" alt="MonopolBank"></img>
            <Container>
               <Row>
                   <Col>
                        <Form onSubmit={this.submit} className="LoginForm">
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required name="username" minLength="4" maxLength="20" placeholder="Enter username" onChange= {this.change} autoComplete="off"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group required controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required name="password" minLength="4" maxLength="25" type="password" placeholder="Password" onChange= {this.change} autoComplete="off"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button style={{marginRight:"2%"}}variant="outline-primary"  onClick= {() => this.setState({loginUser : true})} type="submit">Login</Button>
                                    <Button variant="outline-success"  onClick= {() => this.setState({loginUser : false})} type="submit">SignUp</Button>
                                </Col>
                            </Row>
                        </Form>       
                   </Col>
               </Row>
            </Container>
            <br/>
            { this.state.showError ? 
                <Container className="LoginError">
                    <Row>
                        <Col>
                            <div style={{color: "red"}}>
                                {this.state.errorMessage}
                            </div>
                        </Col>
                    </Row>
                </Container> 
             : null }
        </div>      
        );    
    }
}
export default Login;