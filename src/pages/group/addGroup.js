import Layout from '../../components/Layout.js';
import Axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';

class addGroup extends React.Component {
    static async getInitialProps () {
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        // const data = await res.json()
        const people = await ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '이춘봉'];
    
        return { people: people, logedinUser: '프리모'};
    }

    state = {
        checked: {},
        roomname: '',
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
            roomname: e.target.value
        })
    }
    
    handleClick = () => {
        const { checked, roomname } = this.state;
        var arr = [];
        for(var key in checked) {
            arr.push(checked[key]);
        }
        var data = {
            roomname,
            logedinUser: this.props.logedinUser,
            people: arr
        }
        console.log('this is addgroup data',data);
        Axios.post( 
           '/createRoom',
            data
          ).then( () => {
              Router.replace(`/group`);
          })
          .catch( (err) => {
            if( err ) console.log('this is addGroup Err!!!',err);
        });
      
    }
    
    render() {
      return (
        <Layout>
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