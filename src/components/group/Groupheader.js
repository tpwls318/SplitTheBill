import Link from 'next/link'
import styled from 'styled-components';

const linkStyle = {
  marginRight: 15
}

const GroupHeader = ({meal}) => (
    <Div>
          <Span>{meal.name}</Span>
          <Span>{meal.buyer}</Span>
          <Span>{meal.amount}</Span>
          <Span>{meal.createdAt}</Span>
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