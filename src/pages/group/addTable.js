import Layout from '../../components/Layout.js'
import axios from 'axios';
import styled from 'styled-components';
import Insert from '../../components/group/UserInsert.js';
import Link from 'next/link';
import Router from 'next/router';
import { log } from 'util';

class addTable extends React.Component {
    static async getInitialProps (props) {

        console.log('resresrserseresrserserserserseresr', props);
        // const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '춘봉안'];
        let roomname = props.query.title;
        let people = await axios.post('http://127.0.0.1:3000/getRoomMembers',{roomname})
        people = people.data;
        let logedinUser = people[0];
        if(props.req) {
            logedinUser = props.req.session.displayID;
        }

        return { people, roomname, logedinUser};
    }
    state = {
        checked: {},
        name: '',
        amount: ''
    }

    handleCheck = (e) => {
        
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
        axios.post('/test',data)
        .then( () => {
            Router.replace(`/group/${this.props.roomname}`);
          })
          .catch( (err) => {
            if( err ) console.log('this is addTable Err!!!',err);
        });  
    }

    render() {
      return (
        <Layout>
            <Container>
                <Input type="text" placeholder="Tablename" onChange={this.handleChangeName}/>
                <Input type="text" placeholder="Amount" onChange={this.handleChangeAmount}/>
                <Insert users={this.props.people} onCheck={this.handleCheck} />
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