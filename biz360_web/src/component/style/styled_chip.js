import styled from 'styled-components';
import { getBNFont } from '../../utils/helper';

export const StyledChip = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
  height: 20px;
  border-radius: 15px;
  vertical-align: middle;
  & > span {
    color: ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
    padding: 0 8px;
  }
`;

export const StyledFillChip = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primary};
  background: ${({theme, background})=> !!background? theme.colors[background]: theme.colors.success};
  height: 30px;
  border-radius: 15px;
  vertical-align: middle;
  & > span {
    color: ${({theme, color})=> !!color? theme.colors[color]: theme.colors.primaryFont}; 
    padding: 0 10px;
    font-size: 12px; 
    font-size: ${({ fntsize, theme  }) =>getBNFont(theme.fontSize[fntsize ? fntsize:'bodyContentFontSize'], "lng")};
    font-weight: ${({ fntweight }) => (fntweight ? fntweight : 800)};
  }
`;