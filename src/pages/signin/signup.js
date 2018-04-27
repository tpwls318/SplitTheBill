import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    
    state = {
        name: '',
        userid: '',
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
            userid: e.target.value
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
        const { name, userid, password, cPassword  } = this.state;
        if(password !== cPassword) {
            alert('비번이 같지 않아');
        }
        else {
            const data = { name, userid, password, cPassword };
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/signup',
            data: data
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
