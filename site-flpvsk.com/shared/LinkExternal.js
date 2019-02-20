import styled from '@emotion/styled';
import { css } from '@emotion/core'
import {
  fontSize,
  color
} from 'styled-system'

const LinkExternal = styled.a(
  css`
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
    background-image: url(
      data:image/svg+xml;utf8,
      <svg preserveAspectRatio="none" viewBox="0 0 1 1" x…2000/svg">
        <line x1="0" y1="0" x2="1" y2="1" stroke="currentColor" />
      </svg>
    );
    background-size: 1px 1px;
    background-position: 0 1.05em;
    background-position: 0 calc(1em + 1px);
  `,
  fontSize,
  color,
);

export default LinkExternal;
