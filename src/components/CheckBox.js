import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';

const CheckBox = ({ meal, checked, onClick }) => (
    <div>
        {meal.members.map( (user, index) =>(
            <Label >
                 <Checkbox label={`${user}   : ${ (meal.amount) / (meal.members.length+1) } `}
                 key={index}
                 value={`p-${index}`}
                 onClick={(e) => onClick(e)}
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