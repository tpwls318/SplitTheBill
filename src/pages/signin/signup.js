import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import axios from'axios';
// import redirect from '../../lib/redirect';
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
                console.log(response);
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
            <div>
                <p>Name : <input type="text" onChange={this.handleChangeName}/></p>
                <p>ID : <input type="text" onChange={this.handleChangeId}/>{this.state.confirmedId ? 'checked' : <button onClick={this.handleClickCI}>Confirm ID</button>}</p>
                <p>password : <input type="password" onChange={this.handleChangePW}/></p>
                <p>confirm password : <input type="password" onChange={this.handleChangeCpw}/></p>
                <p><button onClick={this.handleClick}>Sign up</button></p>
            </div>
        </Layout>
    )}
}

