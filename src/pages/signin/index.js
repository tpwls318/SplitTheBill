import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    state = {
        userID: '',
        password: ''
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
            </div>
        </Layout>
    )}
}
