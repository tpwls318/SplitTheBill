import Link from 'next/link'
import styled from 'styled-components';

const linkStyle = {
  marginRight: 15
}

const GroupHeader = () => (
    <Div>
          <Span>Chicken</Span>
          <Span>Paymen</Span>
          <Span>$100,100</Span>
          <Span>18-04-28</Span>
    </Div>
)

const Span = styled.span`
  padding: 0.5em;
`
const Div = styled.div`
  border-bottom: double;
`

export default GroupHeader;