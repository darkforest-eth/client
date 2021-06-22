import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SpacedFlexRow = styled(FlexRow)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
