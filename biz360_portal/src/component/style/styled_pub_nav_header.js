import styled from "styled-components";

export const StyledPubNavHeader = styled.nav`
  width:${({ width }) => width ?? "100%"};
  background: ${({ theme }) => theme.colors.pubNavHeader}; 
`;