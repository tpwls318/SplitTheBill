import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '이춘봉'];
    
        return {people: people};
    }
    state = {
        checked: {},
        name: '',
        amount: ''
    }

    handleCheck = (e) => {
        const obj = this.state.checked;
        if(e.target.checked) {
            obj[e.target.value] = this.props.people[e.target.value.slice(2)];
        } else {
            delete obj[e.target.value];
        }
        console.log(obj);
        this.setState({
            checked: obj
        })
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
        
    }

    handleChangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }
    
    handleClick = () => {
        const { checked, name, amount } = this.state;
        var arr = [];
        for(var key in checked) {
            arr.push(checked[key]);
        }
        var data = {
            name,
            amount,
            people: arr
        }
        console.log(data);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/test',
            data: data
          });
    }
    render() {
      return (
        <Layout>
            <div>
                <p>table name : <input type="text" onChange={this.handleChangeName}/></p>
                <p>amount : <input type="text" onChange={this.handleChangeAmount}/></p>
                {this.props.people.map((item, index) => (
                    <label key={index}><input type="checkbox" onChange={this.handleCheck} value={`p-${index}`} />{item}</label>
                ))}
                <p><button onClick={this.handleClick}>Create</button><button>Cancel</button></p>
            </div>
        </Layout>
    )}
}

