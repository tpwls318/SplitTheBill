import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import axios from'axios';
import redirect from '../../lib/redirect';


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
        const data = this.state;
        if(password !== cPassword) {
            alert('비번이 같지 않아');
        }
        else {
            axios.post('/signup', data).then(function (response) {
                console.log(response);
                if(response.data === true) {
                    alert('가입완료');
                    redirect('/signin');
                } else {
                    alert('아이디 중복');
                    redirect('/signin/signup');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    render() {
      return (
        <Layout>
            <div>
                <p>Name : <input type="text" onChange={this.handleChangeName}/></p>
                <p>ID : <input type="text" onChange={this.handleChangeId}/><button onClick={this.handleClick}>Confirm ID</button></p>
                <p>password : <input type="password" onChange={this.handleChangePW}/></p>
                <p>confirm password : <input type="password" onChange={this.handleChangeCpw}/></p>
                <p><button onClick={this.handleClick}>Sign up</button></p>
            </div>
        </Layout>
    )}
}
