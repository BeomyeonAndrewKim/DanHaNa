import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const FacebookButton = styled(Icon)`
  font-size: 2em;
`;
const TwitterButton = styled(Icon)`
  font-size: 2em;
`;
const shareToFB = () => {
  window.open('http://www.facebook.com/sharer/sharer.php?u=PAGE_URL');
};
const shareToTW = () => {
  window.open('https://twitter.com/intent/tweet?text=TEXT&url=PAGE_URL');
};

export default function SNSShareButton() {
  return (
    <div>
      <FacebookButton onClick={shareToFB} type="facebook" />
      <TwitterButton onClick={shareToTW} type="twitter" />
    </div>
  );
}
