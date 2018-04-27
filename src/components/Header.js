import Link from 'next/link';
import styled from 'styled-components';
import { Drawer, RaisedButton, MenuItem, AppBar, FlatButton, IconButton  } from 'material-ui';

const linkStyle = {
  marginRight: 15
}


const Header = () => (
    <div>
      <MenuItem onClick={this.handleClose}>
      <Link href="/friend">
          <Alink>Friend</Alink>
        </Link>
      </MenuItem>
      <MenuItem onClick={this.handleClose}>
      <Link href="/group">
          <Alink>Group</Alink>
        </Link>
      </MenuItem>
      <MenuItem onClick={this.handleClose}>
      <Link href="/profile">
          <Alink>profile</Alink>
        </Link>
      </MenuItem>
      <MenuItem onClick={this.handleClose}>
      <Link href="/help">
          <Alink>help</Alink>
        </Link>
      </MenuItem>
      <MenuItem onClick={this.handleClose}>
      <Link href="/signin/signup">
          <Alink>signin</Alink>
        </Link>
      </MenuItem>
    </div>
)


const Alink = styled.a`
   marginRight: 15
`
export default Header