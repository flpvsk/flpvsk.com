import styled from '@emotion/styled';
import {
  space,
  width,
  textStyle,
  fontSize,
  color,
  border,
  background,
  boxShadow,
  alignSelf,
  justifySelf,
} from 'styled-system'

const Button = styled.button(
  space,
  width,
  textStyle,
  fontSize,
  color,
  border,
  background,
  boxShadow,
  alignSelf,
  justifySelf,
);

Button.defaultProps = {
  pr: 1,
  pl: 1,
  pb: '4px',
  pt: '4px',
  textStyle: 'caption',
  fontSize: [0, 1],
  border: 'none',
  background: 'black',
  color: 'white',
  boxShadow: 'button',
}

export default Button;