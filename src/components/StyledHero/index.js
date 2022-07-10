import styled from 'styled-components';

const StyledHero = styled.section`
  min-height: calc(100vh - 66px);
  background: url(${(props) => props.bgImg}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;
