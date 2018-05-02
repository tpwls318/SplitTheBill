import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import Link from 'next/link'
import redirect from '../../lib/redirect';
import axios from'axios';
import Router from 'next/router'; 


export default class extends React.Component {
    static async getInitialProps ({ req }) {
        if (req) {
            console.log('on server, need to copy cookies from req')
        } else {
            console.log('on client, cookies are automatic')
        }
        const res = await axios({
            url: 'http://127.0.0.1:3000/getsid',
            // manually copy cookie on server,
            // let browser handle it automatically on client
            headers: req ? {cookie: req.headers.cookie} : undefined,
        });
        return { data: res.data };
    }

    state = {
        userID: '',
        password: '',
        sid: ''
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
        const data = this.state;
        console.log(data);
        
        axios.post('/login', data).then(function (response) {
            console.log(response);
            if(response.data === true) {
                alert('success');
                Router.replace('/');
            } else if(response.data === false) {
                alert('비밀번호 틀림');
                Router.replace('/signin');
            } else {
                alert('존재하지 않는 아이디');
                Router.replace('/signin');
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
                    <p><button>Sign up</button></p>
                </Link>
            </div>
        </Layout>
    )}
}
