import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import Link from 'next/link'
import redirect from '../../lib/redirect';
import axios from'axios';


export default class extends React.Component {
    static async getInitialProps({ res }) {
      

        return {}
    }

    state = {
        userID: '',
        password: '',
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
            } else {
                alert('FAIL');
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
