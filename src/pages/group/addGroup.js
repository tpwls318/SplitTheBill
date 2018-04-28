import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '이춘봉'];
    
        return { people: people, logedinUser: '프리모'};
    }
    state = {
        checked: {},
        groupname: '',
    }

    handleCheck = (e) => {
        const obj = this.state.checked;
        if(e.target.checked) {
            obj[e.target.value] = this.props.people[e.target.value.slice(2)];
        } else {
            delete obj[e.target.value];
        }
        console.log('this is handlecheck',obj);
        this.setState({
            checked: obj
        })
    }

    handleChangeGroup = (e) => {
        this.setState({
            groupname: e.target.value
        })
    }
    
    handleClick = () => {
        const { checked, groupname } = this.state;
        var arr = [];
        for(var key in checked) {
            arr.push(checked[key]);
        }
        var data = {
            groupname,
            logedinUser: this.props.logedinUser,
            people: arr
        }
        console.log('this is data',data);
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
                <p>group name : <input type="text" onChange={this.handleChangeGroup}/></p>
                {this.props.people.map((item, index) => (
                    <label key={index}><input type="checkbox" onChange={this.handleCheck} value={`p-${index}`} />{item}</label>
                ))}
                <p><button onClick={this.handleClick}>Create</button><button>Cancel</button></p>
            </div>
        </Layout>
    )}
}
