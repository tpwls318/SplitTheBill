import Layout from '../../components/Layout.js';
import CheckBox from '../../components/group/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
        

class Table extends React.Component {
    static async getInitialProps (props) { 
        const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/getTables',
            data: {
                roomname : props.query.title
            },
            headers: props.req ? {cookie: props.req.headers.cookie} : undefined,
        }).catch( (err) => {
            if(err) console.log('this is table err', err);
        });
        console.log('type@#@#@type', typeof res.data.sid);
        return {
            data: res.data.tables,
            sid: res.data.sid
        }
    }

    state = {
        checked: {}
    }
    // exports.deleteRow = (req, res) => {
    //     const { from, to, amount, meal, roomId } = req.body;
    //     _addToFrom( [from], to, (0-amount) );
    //     UserMeal.destroy({
    //         where:{
    //             UserId: from,
    //             MealId: meal
    //         }
    //     })
    // }
    handleCheck = (e) => {
        const checked = this.state.checked;
        console.log(this.props.data[0]);
        console.log(e.target.checked);
        let data = this.props.data[0];
        if(e.target.checked) {
            checked[e.target.value] = this.props.data[0].members[e.target.value.slice(2)];
            Axios.post('http://127.0.0.1:3000/deleteRow',
            { 
                from: checked[e.target.value], 
                to:data.buyer, 
                amount:data.amount/(data.members.length+1), 
                meal: data.id , 
                roomId: data.RoomId
            }
            )
        console.log('deleted');
        } else {
            delete checked[e.target.value];
        }
        console.log(checked);
        this.setState({
            checked
        })
    }


    render() {
        console.log('table',this.props.sid);
        
        return (
            <Layout sid={this.props.sid}>
                <Container>
                    <RoomHead>
                        <Name>
                            {this.props.url.query.title}
                        </Name>
                        <AddMeal>
                            <GroupTable group={this.props.url.query.title} />
                        </AddMeal>
                    </RoomHead>
                    {this.props.data.map( (item, index) => (
                        <TableInfo 
                        meal={item} 
                        key={index}
                        checked={this.state.checked}
                        onClick={ this.handleCheck } />
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

const AddMeal = styled.aside`
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

