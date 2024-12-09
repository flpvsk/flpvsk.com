import React from 'react';
import Svg from './Svg';
import IconLink from './IconLink';

import siteInfo from '../siteInfo';

export default function IconLinkGithub(props) {
  return (
    <IconLink
      {...props}
      title='Github: @flpvsk'
      href={siteInfo.githubLink}
    >
      <Svg
        height={props.height}
        width={props.width}
        viewBox='0 0 40 39'
      >
        <path
          d='M13.379 31.377c0 .161-.185.29-.42.29-.265.025-.45-.104-.45-.29 0-.16.185-.29.418-.29.242-.024.452.105.452.29zm-2.508-.362c-.056.16.105.346.347.395.21.08.451 0 .5-.162.048-.16-.105-.346-.347-.419-.21-.056-.444.025-.5.186zm3.564-.137c-.233.056-.395.21-.37.395.024.16.233.265.475.209.234-.056.395-.21.371-.37-.024-.154-.242-.258-.476-.234zM19.742 0C8.556 0 0 8.485 0 19.661c0 8.936 5.629 16.583 13.67 19.275 1.032.185 1.395-.452 1.395-.975 0-.5-.025-3.256-.025-4.948 0 0-5.645 1.209-6.83-2.401 0 0-.92-2.345-2.242-2.95 0 0-1.847-1.264.129-1.24 0 0 2.008.16 3.113 2.079 1.766 3.11 4.725 2.216 5.879 1.684.185-1.29.71-2.184 1.29-2.716-4.508-.5-9.056-1.152-9.056-8.904 0-2.216.612-3.328 1.903-4.746-.21-.524-.895-2.683.21-5.471C11.12 7.824 15 10.524 15 10.524a18.962 18.962 0 0 1 5.065-.685c1.717 0 3.451.233 5.064.685 0 0 3.88-2.708 5.565-2.176 1.104 2.796.419 4.947.21 5.471 1.29 1.426 2.08 2.538 2.08 4.746 0 7.776-4.75 8.397-9.258 8.904.742.637 1.37 1.845 1.37 3.74 0 2.715-.023 6.075-.023 6.735 0 .524.37 1.16 1.395.975C34.532 36.244 40 28.597 40 19.661 40 8.485 30.927 0 19.742 0zM7.839 27.792c-.105.08-.08.265.056.419.13.128.315.185.42.08.104-.08.08-.266-.057-.419-.129-.129-.314-.185-.42-.08zm-.871-.653c-.057.105.024.234.185.314.13.08.29.057.347-.056.056-.105-.024-.234-.185-.315-.162-.048-.29-.024-.347.057zm2.613 2.868c-.13.105-.081.347.104.5.186.185.42.21.525.08.105-.104.056-.346-.105-.499-.178-.185-.42-.21-.524-.08zm-.92-1.184c-.129.08-.129.29 0 .475.13.186.347.266.452.186.129-.105.129-.315 0-.5-.113-.185-.323-.266-.452-.161z'
          fill={props.color}
          fillRule='nonzero'
        />
      </Svg>
    </IconLink>
  );
}
