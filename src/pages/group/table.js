import Layout from '../../components/Layout.js';
import CheckBox from '../../components/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';
import Axios from 'axios';

class Table extends React.Component {
    static async getInitialProps (props) { 
        const data = await Axios.post('http://127.0.0.1:3000/getTables', {
            roomname: props.query.title
        }).catch( (err) => {
            if( err ) console.log('this is Table Err!!!',err);
        });

        return {
            data: data.data
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
                        <TableInfo 
                        meal={item} 
                        key={index}
                        checked={this.state.checked}
                        onClick={ (e)=> this.handleCheck(e) } />
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

const TableInfo = ({ checked,  onClick, meal }) => (
    <div>
        <Groupheader meal={meal}/>
        <CheckBox meal={meal} checked={checked} onClick={onClick}  />
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

