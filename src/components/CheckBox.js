import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';

const CheckBox = ({ checked, users, onClick }) => (
    <div>
        {users.map( (user, index) =>(
            <Label key={index} >
                 <Checkbox label={user} 
                 value={`p-${index}`}
                 onClick={() => onClick(user)}
                  />
            </Label>
        ))}
    </div>
  )

export default CheckBox;

// var Check = styled.input.attrs({
//     type: 'checkbox'
//   })`
//     border: solid 1px red;
//     background-color: red;
//   `;


const Label = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`