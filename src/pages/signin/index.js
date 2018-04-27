import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await [
            {
                username: 'oneway',
                password: 1111
            }, 
            {
                username: 'sergei',
                password: 2222
            }, 
            {
                username: 'KJH',
                password: 1111
            }];
    
        return {people: people};
    }
    state = {
        id: '',
        password: ''
    }

    handleChangeId = (e) => {
        console.log(e.target.value);
        this.setState({
            id: e.target.value
        })
    }

    handleChangePW = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
    }
    
    handleClick = () => {
        const { id, password } = this.state;
        const data = { username: id, password: password };
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/login',
            data: data
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
