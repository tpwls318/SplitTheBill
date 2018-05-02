import Layout from '../../components/Layout.js';
import CheckBox from '../../components/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';
import Axios from 'axios';
Axios.defaults.port = 3000;
class Table extends React.Component {
    static async getInitialProps (props) { 
        
        const data = await Axios.post('http://127.0.0.1:3000/getTables',
        {roomname: props.query.title}
        ).catch( (err) => {
            if( err ) console.log('this is Table Err!!!',err);
        });
        console.log(`datadata!!@@!#!@#!@#!@#!@#: ${JSON.stringify(data.data)}`);
        
        return {
            data: data.data
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
        
    return (
            <Layout>
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

