import styled from '@emotion/styled';
import { css } from '@emotion/core'
import {
  fontSize,
  color
} from 'styled-system'

const svgLine = escape(`
  <svg preserveAspectRatio="none" viewBox="0 0 1 1"
    xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="1" y2="1" stroke="currentColor" />
  </svg>
`.replace(/\n/, '').replace(/\s+/, ' '));

const LinkText = styled.a(
  css`
    cursor: pointer;
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(
      to right,rgba(0,0,0,.84) 100%,
      rgba(0,0,0,0) 0
    );
    background-image: linear-gradient(
      to right,
      currentColor 100%,
      currentColor 0
    );
    background-image: url(data:image/svg+xml;utf8,${svgLine});
    background-size: 1px 1px;
    background-position: 0 1.05em;
    background-position: 0 calc(1em + 1px);
  `,
  fontSize,
  color,
);


LinkText.defaultProps = {
  color: 'blacks.0'
};

export default LinkText;
