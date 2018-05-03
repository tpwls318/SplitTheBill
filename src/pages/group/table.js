import Layout from '../../components/Layout.js';
import CheckBox from '../../components/group/CheckBox.js';
import Groupheader from '../../components/group/Groupheader.js';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
        

class Table extends React.Component {
    static async getInitialProps (props) { 
        let check;
        if(props.req) check = !!props.req.session.displayID;
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
        if(props.req) console.log('idididididididididid',props.req.session.displayID);
        
        return {
            data: res.data.tables,
            sid: res.data.sid,
            check,
            // displayID: props.req.session.displayID
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
        console.log(this.props.data);
        // console.log(e.target.checked);
        
        let index = e.target.value.split(':')[1];
        let mealIndex = e.target.value.split(':')[2];
        let data = this.props.data[mealIndex];
        if(e.target.checked) {
            checked[e.target.value] = data.members[index];
            axios.post('http://127.0.0.1:3000/deleteRow',
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
        const group = this.props.url.query.title;
        return (
            <Layout close={this.props.check}>
                <Container>
                    <RoomHead>
                        <Name>
                            {this.props.url.query.title}
                        </Name>

                            {/* <GroupTable group={this.props.url.query.title} /> */}
                            <Link prefetch as={`/group/addTable/${this.props.url.query.title}`} href={`/group/addTable?title=${this.props.url.query.title}`}>
                                <div>+table</div>
                            </Link>

                    </RoomHead>
                    {this.props.data.map( (item, index) => (
                        <TableInfo 
                        meal={item} 
                        mealIndex={index}
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
    
     <Link prefetch as={`/group/addTable/${group}`} href={`/group/addTable?title=${group}`}>
        <div>+table</div>
      </Link>

  )

const TableInfo = ({ checked,  onClick, meal, mealIndex }) => (
    <div>
        <Groupheader meal={meal}/>
        <CheckBox meal={meal} checked={checked} onClick={onClick} mealIndex={mealIndex} />
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

