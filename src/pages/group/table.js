import Layout from '../../components/Layout.js';
import CheckBox from '../../components/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';
import Axios from 'axios';

class Table extends React.Component {
    static async getInitialProps () {
        // const users = await Axios.get(`/${this.props.url.query.title}`);
        const users = await ['세르게이','전한길','김재현'];


        return {
            users: users
        }
    }

    state = {
        checked: {},
    }


    handleCheck = (e) => {
        console.log('dfdfdfdfdf',e);
        
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


    render() {
        
    return (
            <Layout>
                <Container>
                    <RoomHead>
                        <Name>
                            {this.props.url.query.title}
                        </Name>
                        <PlusMeal>
                            <GroupTable group={this.props.url.query.title} />
                        </PlusMeal>
                    </RoomHead>
                    <CheckBox checked={this.state.checked} users={this.props.users} onClick={ (e)=> this.handleCheck(e) } />
                    {/* <label><input type="checkbox" onChange={this.handleCheck} value='111' />ddd</label> */}
                    {/* <TableInfo checked={this.state.checked} users={this.props.users} onClick={this.handleCheck.bind(this)} /> */}
                </Container>
            </Layout>
        );
    }
} 


const GroupTable = ({group}) => (
    <span>
      <Link prefetch as={`/group/addTable/${group}`} href={`/group/addTable?title=${group}`}>
        <div>+table</div>
      </Link>
    </span>
  )

const TableInfo = ({checked, users, onClick}) => (
    <div>
        <Groupheader />
        <CheckBox checked={checked} users={users} onClick={onClick} />
    </div>
  )

export default Table;

const Container = styled.div`
    background-color: powderblue;
    display:flex;
    flex-direction:column;
`

const RoomHead = styled.section`
    display:flex;
    align-items: center;
    background-color: #a29bfe;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
`

const PlusMeal = styled.aside`
    border-left:1px solid gray;
    flex-basis: 150px;
    flex-shrink: 0;
    padding:1em;
`

const Name = styled.nav`
    border-right:1px solid gray;
    flex-basis: 150px;
    flex-shrink: 0;
    padding:1em;
`

const Main = styled.main`
    padding:10px;
`

