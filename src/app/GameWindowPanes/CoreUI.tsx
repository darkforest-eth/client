import styled, { css } from 'styled-components';
import dfstyles from '../../styles/dfstyles';

export const Input = styled.input`
    transition: background 0.2s, color 0.2s, width: 0.2s !important;
    outline: none;
    background: ${dfstyles.colors.background};
    color: ${dfstyles.colors.subtext};
    border-radius: 4px;
    border: 1px solid ${dfstyles.colors.text};
    width: 20em;
    padding: 2px 6px;

    &:focus {
      background: ${dfstyles.colors.backgroundlight};
      color: ${dfstyles.colors.text};
      width: 20em;
    }
`;

export const Spacer = styled.div`
  ${({ width, height }: { width?: number; height?: number }) => css`
    width: 1px;
    height: 1px;
    ${width && !height ? 'display: inline-block;' : ''}
    ${width ? `width: ${width}px;` : ''}
    ${height ? `height: ${height}px;` : ''}
  `}
`;

export const Truncate = styled.div`
  display: inline-block;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
/**
 * The container element into which a plugin renders its html elements.
 * Contains styles for child elements so that plugins can use UI
 * that is consistent with the rest of Dark Forest's UI. Keeping this up
 * to date will be an ongoing challange, but there's probably some better
 * way to do this.
 */
export const PluginElements = styled.div`
  color: white;
  width: 400px;
  min-height: 100px;
  max-height: 600px;
  overflow: scroll;

  button {
    border: 1px solid white;
    border-radius: 4px;
    padding: 0 0.3em;

    background 0.2s, colors 0.2s;
    
    &:hover {
      background-color: white;
      color: black;
      border: 1px transparent;
    }
  }
`;

export const MaxWidth = styled.div`
  ${({ width }: { width: string }) => {
    return css`
      max-width: ${width};
    `;
  }}
`;
