import Link from 'next/link'
import styled from 'styled-components';

const linkStyle = {
  marginRight: 15
}

const GroupHeader = ({meal}) => (
    <Div>
          <Span>{meal[0]}</Span>
          <Span>{meal[1]}</Span>
          <Span>{meal[2]}</Span>
          <Span>{meal[3]}</Span>
    </Div>
)

const Span = styled.span`
  padding: 0.5em;
`
const Div = styled.div`
  border-top: double;
  border-bottom: double;
`

export default GroupHeader;