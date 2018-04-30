import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '춘봉안'];
    
        let roomname='immersive6', logedinUser= '전한길';
        return { people, roomname, logedinUser};
    }
    state = {
        checked: {},
        name: '',
        amount: ''
    }

    handleCheck = (e) => {
        console.log('dfdfdfdf',e);
        
        const checked = this.state.checked;
        if(e.target.checked) {
            checked[e.target.value] = this.props.people[e.target.value.slice(2)];
        } else {
            delete checked[e.target.value];
        }
        console.log(checked);
        this.setState({
            checked
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
        const { roomname, logedinUser } = this.props;
        var people = [];
        for(var pid in checked) {
            people.push(checked[pid]);
        }
        var data = {
            name,
            amount,
            roomname,
            logedinUser,
            people
        }
        console.log(data);
        axios.post('/test', data);
    }
    render() {
      return (
        <Layout>
            <div>
                <p>table name : <input type="text" onChange={this.handleChangeName}/></p>
                <p>amount : <input type="text" onChange={this.handleChangeAmount}/></p>
                {this.props.people.map((person, index) => (
                    <label key={index}><input type="checkbox" onChange={this.handleCheck} value={`p-${index}`} />{person}</label>
                ))}
                <p><button onClick={this.handleClick}>Create</button><button>Cancel</button></p>
            </div>
        </Layout>
    )}
}

