import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';


const UserList = ({ users, onCheck }) => (
    <Container>
        {users.map( (user, index) =>(
            <Label key={index} >
                <Avatar src="https://pbs.twimg.com/profile_images/674900083310092292/88WaIvo5.jpg" />
                <div style={{width: '100%', margin: '0 auto'}}>
                <Checkbox label={user} labelPosition='left' onCheck={onCheck} value={`p-${index}`} 
                    labelStyle={{color: 'white', margin:'0 auto', display:'inline-block'}}
                    iconStyle={{fill: 'white', paddingRight:'3em'}}
                    inputStyle={{
                        backgroundColor:'red',
                        justifyContent:'flex-start',
                        margin:'0 auto'
                    }}
                    style={{
                        paddingLeft:'1em',
                        alignItems:'center'
                        }}
                        />
                </div>
            </Label>
        ))}
    </Container>
  )

export default UserList;

const Container = styled.div`
    background-color:  #fab1a0;
    display:flex;
    flex-direction:column;
`
const Model = styled.div`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const Label = styled.label`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1em;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
`;