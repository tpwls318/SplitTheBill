import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import axios from'axios';
// import redirect from '../../lib/redirect';
import styled from 'styled-components';
import Router from 'next/router';
import Icon from '../../lib/DoneIcon.js';

export default class extends React.Component {
    static async getInitialProps ({ req }) {
        const res = await axios({
            url: 'http://127.0.0.1:3000/getsid',
            headers: req ? {cookie: req.headers.cookie} : undefined,
        });
        return { sid: res.data.sid };
    }
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
        if(!(name && userID && password && cPassword)) {
            alert('모든 항목 입력 하시오');
        } else if(this.state.password !== this.state.cPassword) {
            alert('비번이 같지 않아');
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
        <Layout sid={this.props.sid}>
            <Container>
                <Col>
                    <Button google > <Iname class="fa fa-google fa-fw">G</Iname> Login with Google+ </Button>
                    <Input type="text" placeholder="User Name" onChange={this.handleChangeName}/>
                    <UserId>
                        <Input type="text" primary placeholder="User Id" onChange={this.handleChangeId}/>
                        {this.state.confirmedId ? <Checked>checked</Checked> : <Button primary onClick={this.handleClickCI}>
                        <Content><Icon /></Content>
                        <Message>Check</Message>
                        </Button>}
                    </UserId>
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
const UserId = styled.div`
    display: flex;
    justify-content: center;
`

const Input = styled.input`
    box-sizing: border-box;
    width: ${props => props.primary ? '90%' : '100%'};
    padding: 12px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    @media (max-width: 800px) {
        width: ${props => props.primary ? '80%' : '100%'};
    };
`
const Checked = styled.div`
    color: 'red';
    box-sizing: border-box;
    width: 10%;
    padding: 12px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
`
const Iname = styled.i`
    text-align: center;
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
`

const Button = styled.button`
    width: ${props => props.primary ? '10%' : '100%'};
    padding: ${props => props.primary ? '8px' : '12px'};
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.8;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    background-color: ${props => props.google ? '#dd4b39' : '#4CAF50'};
    color: white;
    cursor: pointer;
    &:hover{
        opacity: 1;
    };
    @media (max-width: 800px) {
        width: ${props => props.primary ? '20%' : '100%'};
    };
`
const Message = styled.div`
    @media (max-width: 800px) {
        display: none;
    };
`
const Content = styled.div`
    display: none;
    margin: 0 auto;
    @media (max-width: 800px) {
        display: block;
    };
`