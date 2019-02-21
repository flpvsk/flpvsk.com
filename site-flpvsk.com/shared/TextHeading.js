import styled from '@emotion/styled';
import {
  space,
  textAlign,
  textStyle,
  fontSize,
  color
} from 'styled-system'


const Heading = styled.h1(
  space,
  textStyle,
  fontSize,
  color,
  textAlign,
);


Heading.defaultProps = {
  color: 'black',
};


export default Heading;
