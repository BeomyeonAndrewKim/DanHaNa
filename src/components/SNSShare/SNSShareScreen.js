import React, { Component } from 'react';

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
        <div id="fb-root">dd</div>
        <div
          className="fb-share-button"
          data-href="https://developers.facebook.com/docs/plugins/"
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
