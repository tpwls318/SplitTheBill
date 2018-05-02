import Header from './Header';
import styled from 'styled-components';
import Head from 'next/head';
import { Drawer, RaisedButton, MenuItem, AppBar, FlatButton, IconButton  } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'next/link';


class Layout extends React.Component {

  state = {
    open: false,
    sid: null
  };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    // console.log('Layout is ',check,this.state);
    
    return (
      <MuiThemeProvider>
        {/* {this.checkLogin()} */}
        <div>
        <AppBar
          title={<StyledSpan>Title</StyledSpan>}
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={
            this.state.logged ? <FlatButton href="/" label="LogOut" /> :
             <FlatButton href="/signin" label="Login" />}
        />
        {this.props.children}
        <Drawer width={200} open={this.state.open} onClick={this.handleToggle}>
          <AppBar title="AppBar" onClick={this.handleToggle}/>
          <Header />
        </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}


const StyledSpan = styled.span`
  cursor: pointer;
`;


export default Layout;