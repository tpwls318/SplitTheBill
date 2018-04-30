import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');


export default class extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '이춘봉'];
    
        return { people, logedinUser: '프리모'};
    }
    state = {
        checked: {},
        groupname: '',
    }

    handleCheck = (e) => {
        const checked = this.state.checked;
        if(e.target.checked) {
            checked[e.target.value] = this.props.people[e.target.value.slice(2)];
        } else {
            delete checked[e.target.value];
        }
        console.log('this is handlecheck',checked);
        this.setState({
            checked
        })
    }

    handleChangeGroup = (e) => {
        this.setState({
            groupname: e.target.value
        })
    }
    
    handleClick = () => {
        const { checked, groupname } = this.state;
        const { logedinUser } = this.props;
        var people = [];
        for(var pid in checked) {
            people.push(checked[pid]);
        }
        var data = {
            groupname,
            logedinUser,
            people
        }
        console.log('this is data',data);
        axios.post('/test',data);
    }
    render() {
      return (
        <Layout>
            <div>
                <p>group name : <input type="text" onChange={this.handleChangeGroup}/></p>
                {this.props.people.map((person, index) => (
                    <label key={index}><input type="checkbox" onChange={this.handleCheck} value={`p-${index}`} />{person}</label>
                ))}
                <p><button onClick={this.handleClick}>Create</button><button>Cancel</button></p>
            </div>
        </Layout>
    )}
}
