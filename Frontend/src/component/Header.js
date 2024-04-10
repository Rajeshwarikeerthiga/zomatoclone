
import React from "react";
import  "./style/header.css";
import Modal from "react-modal";
import GoogleLogin from 'react-google-login';
import { loadGapiInsideDOM } from "gapi-script";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width :"300px",
    height:"300px",
  },
};
const signupStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width :"450px",
      height:"550px",
    },
  };
class Header extends React.Component{
    constructor(){
        super();
        this.state={
            loginPageIsOpen:false,
            isLoggedin:false,
            LoggedUser:undefined,
            signupPageOpen:false
        }

    }
    componentDidMount(){
       
        (async()=>{
            await loadGapiInsideDOM()
        })()
    }

    handleLogin=()=>{
       this.setState({loginPageIsOpen:true}) ;
    }
    handleSignup=()=>{
        this.setState({signupPageOpen:true}) ;
    }
    cancelLogin=()=>{
        this.setState({loginPageIsOpen:false}) ;
        this.setState({signupPageOpen:false}) ;
    }
    responseGoogle = (response) => {
        this.setState({isLoggedin:true,LoggedUser:response.profileObj.name,loginPageIsOpen:false});
      }
    handleLogout=()=>{
        this.setState({isLoggedin:false,LoggedUser:undefined})
    }
    render(){
       const {loginPageIsOpen,isLoggedin,LoggedUser,signupPageOpen}=this.state;
        return(
            <div className="Header-one">
                {/* <p className="Header-logo" style={{display:display}}>e!</p> */}
                {!isLoggedin ?
                <div>
                <div className="signup" onClick={this.handleLogin}>  Login</div>
                <div className="signin"  onClick={this.handleSignup}>Create an Account</div>
                </div> : <div>
                <div className="signup" > {LoggedUser} </div>
                <div className="signin" onClick={this.handleLogout}>  Sign out </div>
                </div>}
                <Modal isOpen={loginPageIsOpen} style={customStyles}>
                    <h2 style={{color:"navy"}}>Login</h2><br/>
                    <input type="text" placeholder="EMail" style={{width:"100%"}}/><br/><br/>
                    <input type="password" placeholder="password" style={{width:"100%"}}/><br/>
                    <div style={{textAlign:"center",marginTop:"20px"}}>
                        <button style={{backgroundColor:"blue",marginRight:"15px",color:"white"}}>Login</button>
                        <button onClick={this.cancelLogin}>Cancel</button><br/><br/>
                        <button style={{backgroundColor:"lightgray", marginBottom:"10px"}}><b>f</b> continue with facebook</button><br/>
                        <GoogleLogin 
                       clientId="1036519843385-n2km8g76mn4qnutcdelibug9q8m4nbhv.apps.googleusercontent.com"
                       buttonText="Continue with Google"
                       onSuccess={this.responseGoogle}
                       onFailure={this.responseGoogle}
                     cookiePolicy={'single_host_origin'}
                      />
                    </div>
                </Modal>
                <Modal isOpen={signupPageOpen} style={signupStyles}>
                    <div>
                    <h2 style={{display:"inline-block",width:"380px"}}>Sign up</h2>
                    <button  onClick={this.cancelLogin}>X</button>
                    </div>
                    <p>Please fill this form to create an account</p>
                    <hr/>
                    <label className="label2">FirstName</label>
                    <input type="text" placeholder="First name" className="int2"/><br/><br/>
                    <label className="label2">LastName</label>
                    <input type="text" placeholder="Last name" className="int2"/><br/><br/>
                    <label className="label2">Mobile Number</label>
                    <input type="number" placeholder="Mobile Number" className="int2"/><br/><br/>
                    <label className="label2">EMail</label>
                    <input type="Email" placeholder="Email" className="int2"/><br/><br/>
                    <label className="label2">password</label>
                    <input type="password" placeholder="password" className="int2"/><br/><br/>
                    <label className="label2">Confirm password</label>
                    <input type="password" placeholder="confirm password" className="int2"/><br/><br/>
                    By creating an account you agree to our<a href=" #">Terms & Privacy</a><br/><br/>
                    <div style={{textAlign:"right"}}>
                        <button style={{backgroundColor:"tomato",color:"white"}}>Proceed</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Header;