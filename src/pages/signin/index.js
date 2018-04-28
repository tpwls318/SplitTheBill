import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import Link from 'next/link'
import redirect from '../../lib/redirect';
import axios from'axios';


export default class extends React.Component {
    static async getInitialProps () {
        this.getSession();
        return {};
    }

    state = {
        userID: '',
        password: ''
    }

    getSession = () => {
        axios.get('/getSession').then(function (response) {
            alert(response);
        });
    }
    handleChangeId = (e) => {
        console.log(e.target.value);
        this.setState({
            userID: e.target.value
        })
    }

    handleChangePW = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
    }
    
    handleClick = () => {
        const { userID, password } = this.state;
        const data = { userID: userID, password: password };
        axios.post('/login', data).then(function (response) {
            console.log(response);
            if(response.data === true) {
                alert('success');
                redirect('/');
            } else if(response.data === false) {
                alert('비밀번호 틀림');
                redirect('/signin');
            } else {
                alert('존재하지 않는 아이디');
                redirect('/signin');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

 
    render() {
      return (
        <Layout>
            <div>
                <p>id : <input type="text" onChange={this.handleChangeId}/></p>
                <p>password : <input type="password" onChange={this.handleChangePW}/></p>
                <p><button onClick={this.handleClick}>Login</button></p>
                <Link href="/signin/signup">
                    <p><button onClick={this.handleClick}>Sign up</button></p>
                </Link>
            </div>
        </Layout>
    )}
}
