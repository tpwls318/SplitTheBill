import styled from 'styled-components';

const CheckBox = ({users}) => (
    <div>
        {users.map( user =>(
            <Label>
                 <input type="checkbox" />
                 <span className="checkmark"></span>
                 {user}
            </Label>
        ))}
    </div>
  )

export default CheckBox;

  const Label = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`