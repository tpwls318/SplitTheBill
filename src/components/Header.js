import Link from 'next/link';
import styled from 'styled-components';
import { MenuItem } from 'material-ui';

const Header = (props) => (
    <div>
      <MenuItem href="/group" primaryText="Group" />
      <MenuItem href="/friend" primaryText="Friend" />
      <MenuItem href="/profile" primaryText="Profile" />
      <MenuItem href="/" primaryText="Help" />
    </div>
)

const Alink = styled.a`
   marginRight: 15
`
export default Header