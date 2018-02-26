import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class SNSShareScreen extends Component {
  componentWillMount() {
    (function(d, s, id) {
      let js = null,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=292444687949351';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }
  share = () => {
    window.open(
      'http://www.facebook.com/sharer/sharer.php?u=http://eel7891.com',
    );
  };

  render() {
    return (
      <div>
        <Helmet>
          <meta
            property="og:url"
            content="https://Danhana.netlify.com.netlify.com/snsshare"
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="단 하나" />
          <meta
            property="og:description"
            content="일주일에 단 하나의 목표를 설정하고 완료해보세요"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/test-368e1.appspot.com/o/users%2FKerCHi8BRYeESR01zicIEPVtMDv1%2FphotoURL?alt=media&token=49c47130-a7ac-4e02-b7d8-f4df585fb8ce"
          />
        </Helmet>
        <div id="fb-root">dd</div>
        <div
          className="fb-share-button"
          data-href="https://Danhana.netlify.com.netlify.com/snsshare"
          data-layout="button"
          data-size="small"
          data-mobile-iframe="true"
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
            className="fb-xfbml-parse-ignore"
          >
            공유하기
          </a>
        </div>
        <div onClick={this.share}>asdfaiosjdfoijasdof</div>
        <div />
      </div>
    );
  }
}
