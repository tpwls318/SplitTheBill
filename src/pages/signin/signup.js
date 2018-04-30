import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import axios from'axios';
import redirect from '../../lib/redirect';
import styled from 'styled-components';
import Router from 'next/router';

export default class extends React.Component {
    
    state = {
        name: '',
        userID: '',
        password: '',
        cPassword: ''
    }
    handleChangeName = (e) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value
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

    handleChangeCpw = (e) => {
        console.log(e.target.value);
        this.setState({
            cPassword: e.target.value
        })
    }
    
    handleClick = () => {
        const { name, userID, password, cPassword  } = this.state;
        if(password !== cPassword) {
            alert('비번이 같지 않아');
        }
        else {
            const data = { name, userID, password, cPassword };
            axios.post('/signup', data).then(function (response) {
                console.log('response data',response.data);
                if(response.data === true) {
                    alert('가입완료');
                    Router.replace('/signin');
                } else {
                    alert('아이디 중복');
                    Router.replace('/signin/signup');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    render() {
      return (
        <Layout>
            <Container>
                <Col>
                    <Input type="text" placeholder="User Name" onChange={this.handleChangeName}/>
                    <Input type="text" placeholder="User Id" onChange={this.handleChangeId}/>
                    <Input type="password" placeholder="User PassWord" onChange={this.handleChangePW}/>
                    <Input type="password" placeholder="Confirm PassWord" onChange={this.handleChangeCpw}/>
                    <Button onClick={this.handleClick}>Sign up</Button>
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
    padding: 50px;
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