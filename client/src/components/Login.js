import React from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (

    // <div className="title">

    //     <h1> CUNYFirst Login Page </h1>

    // </div>

    <div className="App">
    <div className="bg"></div>
    <div className="bgl"></div>
    <div className="top"></div>


<div id="id01" class="modal">
  
    <div class="container">

    <button className="ui button"><Link to='/'>Terms of Use</Link></button>
    <h2> Log in with your CUNY Login credentials(CUNYfirst Username@login.cuny.edu and CUNYfirst Password) </h2>

    <h3> Please input your CUNY email</h3>
      <div className="ui input error">
            <input type="text" placeholder="CUNY email"></input>
        </div>        <br></br>
    <h4> Please enter your password </h4>
      <div className="ui input">
      <input type="password" placeholder="Enter Password" name="psw" required></input>
      </div>
        <br></br>
        <br></br>
    <button class="ui button" type="submit">
      Login
    </button>
      <br></br>
    <span class="psw"><br></br> <a href="#">Forgot your password?</a></span>
     <br></br>
     <br></br>
     If you do not have a CUNYfirst account, see the <a href="http://www2.cuny.edu/about/administration/offices/cis/cuny-login-faq#cuny_login_guest" target="_blank">FAQs</a>
    </div>

</div>

    <header className="pic">
        <img src="https://ssologin.cuny.edu/images/cuny-logo.jpg"></img>
    </header>


      <header className="App-title">

        <h1> CUNYFirst Login Page </h1>

      </header>

      <header className="App-header">

      </header>
    </div>

  );
}

export default Login;