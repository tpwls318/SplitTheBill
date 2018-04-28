import Layout from '../../components/Layout.js'
import fetch from 'isomorphic-unfetch'
const axios = require('axios');
import styled from 'styled-components';
import Insert from './UserInsert.js';
// import MobileTearSheet from './MobileTearSheet';

class addTable extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '이춘봉'];
    
        let roomname='immersive6', logedinUser= '전한길';
        return { people, roomname, logedinUser};
    }
    state = {
        checked: {},
        name: '',
        amount: ''
    }

    handleCheck = (e) => {
        console.log('dfdfdfdf',e.target);
        
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
        var people = [];
        for(var key in checked) {
            people.push(checked[key]);
        }
        var data = {
            name,
            amount,
            roomname: this.props.roomname,
            logedinUser: this.props.logedinUser,
            people
        }
        console.log(data);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/test',
            data
          });
    }

    render() {
      return (
        <Layout>
            <Container>
                <Input type="text" placeholder="Tablename" onChange={this.handleChangeName}/>
                <Input type="text" placeholder="Amount" onChange={this.handleChangeAmount}/>
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

export default addTable;

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