import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import axios from'axios';
// import redirect from '../../lib/redirect';
import styled from 'styled-components';
import Router from 'next/router';

export default class extends React.Component {
    state = {
        name: '',
        userID: '',
        password: '',
        cPassword: '',
        confirmedId: false
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
        if(this.state.password !== this.state.cPassword) {
            alert('비번이 같지 않아');
        } else if(!name || !userID || !password || !cPassword) {
            alert('모든 항목 입력 하시오');
        } else if(!this.state.confirmedId) {
            alert('confirm id 하시오')
        } else {
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
    handleClickCI = () => {
        const { name, userID, password, cPassword  } = this.state;
        const self = this;
        if(userID.length === 0) {
            alert('아이디를 입력하시오');
        } else {
            const data = { name, userID, password, cPassword };
            axios.post('/confirmID', data).then(function (response) {
                if(response.data === true) {
                    alert('사용 가능');
                    self.setState({
                        confirmedId: true
                    })
                } else {
                    alert('아이디 중복');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        
        console.log(this.state.confirmedId);
    }
    render() {
      return (
        <Layout>
            {/* <div>
                <p>Name : <input type="text" onChange={this.handleChangeName}/></p>
                <p>ID : <input type="text" onChange={this.handleChangeId}/>{this.state.confirmedId ? 'checked' : <button onClick={this.handleClickCI}>Confirm ID</button>}</p>
                <p>password : <input type="password" onChange={this.handleChangePW}/></p>
                <p>confirm password : <input type="password" onChange={this.handleChangeCpw}/></p>
                <p><button onClick={this.handleClick}>Sign up</button></p>
            </div> */}
            <Container>
                <Col>
                    <Input type="text" placeholder="User Name" onChange={this.handleChangeName}/>
                    <Input type="text" placeholder="User Id" onChange={this.handleChangeId}/>{this.state.confirmedId ? 'checked' : <button onClick={this.handleClickCI}>Confirm ID</button>}
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
