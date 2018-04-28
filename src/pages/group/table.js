import Layout from '../../components/Layout.js';
import CheckBox from '../../components/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';
import Axios from 'axios';

class Table extends React.Component {
    static async getInitialProps () {
        // const users = await Axios.get(`/${this.props.url.query.title}`);
        const data = await [{
            users: ['세르게이','전한길','김재현'],
            meal: ['chicken', '전한길', '100000', '18-04-26']
        } ,{
            users: ['고라니','소라니','시라소니','빗살무늬'],
            meal: ['Pizza', 'rhfksl', '3100000', '18-04-28']
        }]

        return {
            data
        }
    }

    state = {
        checked: {}
    }


    handleCheck = (e) => {
        const obj = this.state.checked;
        if(e.target.checked) {
            obj[e.target.value] = this.props.users[e.target.value.slice(2)];
        } else {
            delete obj[e.target.value];
        }
        console.log(obj);
        this.setState({
            checked: obj
        })
    }


    render() {
        console.log('dfdfdfd',this.props.data[0].meal[2]);
        
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
                    {this.props.data.map( (item, index) => (
                        <TableInfo eachMoney={(item.meal[2]) / (item.users.length)} meal={item.meal} checked={this.state.checked} 
                        users={item.users} onClick={ (e)=> this.handleCheck(e) } />
                    ))}
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

const TableInfo = ({eachMoney, checked, users, onClick, meal}) => (
    <div>
        <Groupheader meal={meal}/>
        <CheckBox checked={checked} users={users} onClick={onClick} money={eachMoney} />
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

