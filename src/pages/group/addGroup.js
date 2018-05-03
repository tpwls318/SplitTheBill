import Layout from '../../components/Layout.js';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';

class addGroup extends React.Component {
    static async getInitialProps ({ req }) {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        // const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '이춘봉'];
        const res = await axios({
            url: 'http://127.0.0.1:3000/getsid',
            headers: req ? {cookie: req.headers.cookie} : undefined,
        });
        const people = await axios.get(
            'http://127.0.0.1:3000/getUsers',
        );
        console.log('type@#@#@type', people);
        return { sid: res.data.sid, people:people.data };
    }

    state = {
        checked: {},
        roomname: '',
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
            roomname: e.target.value
        })
    }
    
    handleClick = () => {
        const { checked, roomname } = this.state;
        console.log(this.state);
        console.log(checked, roomname);
        
        var people = [];
        for(var pid in checked) {
            people.push(checked[pid]);
        }
        var data = {
            roomname,
            logedinUser: this.props.logedinUser,
            people
        }
        console.log('this is addgroup data',data);
        axios.post( 'http://127.0.0.1:3000/createRoom', data)
        .then( (res) => {
              Router.replace(`/`);
          })
        .catch( (err) => {
            if( err ) console.log('this is addGroup Err!!!',err);
        });
        // Router.replace(`/group`);
    }
    
    render() {
        console.log('dfdfdf',this.props);
        
      return (
        <Layout sid={this.props.sid}>
            <Container>
              <Input type="text" placeholder="GroupName" onChange={this.handleChangeGroup}/>
                {this.props.people.map((item, index) => (
                    <label key={index}><input type="checkbox" onChange={this.handleCheck} value={`p-${index}`} />{item}</label>
                ))}
                <Btn>
                    <Button onClick={this.handleClick} prime >Create</Button>
                    <Button>Cancel</Button>
                </Btn>
            </Container>
        </Layout>
    )}
}


export default addGroup;

const Container = styled.div`
    position: relative;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px 0 30px 0;
    display: flex;
    align-content: center;
    flex-direction: column;
`
const Input = styled.input`
    padding: 12px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
`
const Btn = styled.div`
    display: flex;
    align-content: center;
`

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    background-color: ${ props => props.prime ? '#4CAF50' : '#ff7675' };
    color: white;
    cursor: pointer;
    &:hover: background-color: #45a049;
`