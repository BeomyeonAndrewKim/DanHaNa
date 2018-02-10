import React, { Component } from 'react';

export default class MenuProfile extends Component {
  render() {
    return (
      <div>
        <figure>
          <img
            className="profileImg"
            alt="profilimg"
            src="https://firebasestorage.googleapis.com/v0/b/danhana-dev.appspot.com/o/1492752277484.jpg?alt=media&token=4fdb2365-3118-4dcd-bf67-d0dbeace4e93"
          />
          <figcaption>BeomyeonKim</figcaption>
        </figure>
      </div>
    );
  }
}
