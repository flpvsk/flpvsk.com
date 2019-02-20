import styled from 'styled-components';
import {
  space,
  width,
  textAlign,
  textStyle,
  fontSize,
  color
} from 'styled-system'

const Caption = styled.div`
  ${space}
  ${width}
  ${textAlign}
  ${textStyle}
  ${fontSize}
  ${color}
`;


Caption.defaultProps = {
  textStyle: 'caption',
  fontSize: [ 0, 1 ],
};


export default Caption;
