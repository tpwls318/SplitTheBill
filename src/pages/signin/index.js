import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import Link from 'next/link'
import redirect from '../../lib/redirect';
import axios from'axios';
import Router from 'next/router'; 
import styled from 'styled-components';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
        let check;
        if(req) check = !!req.session.displayID;
        return { 
            check
         };
    }
    state = {
        userID: '',
        password: '',
    }

    handleClose = () => {
        this.setState({
            password: e.target.value
        })
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
        
        axios.post('/login', data).then(function (response) {
            console.log('displayid!!!!!',response.data.displayID);
            if(response.data.displayID) {
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
        <Layout close={this.props.check}>
            <Container>
                <Col>
                    <Input type="text" placeholder="Your id" onChange={this.handleChangeId}/>
                    <Input type="password" placeholder="Your password" onChange={this.handleChangePW}/>
                    <Button onClick={this.handleClick}>Login</Button>
                    <Link href="/signin/signup">
                        <Button>Sign up</Button>
                    </Link>
                </Col>
            </Container>
        </Layout>
    )}
}


const Container = styled.div`
    position: relative;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px 0 30px 0;
`
const Col = styled.div`
    margin: auto;
    padding: 3em;
`

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
`

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: #45a049;
    } 
`