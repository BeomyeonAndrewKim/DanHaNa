import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import styled from 'styled-components';

const MenuCloseEl = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export default class MenuButton extends Component {
  static defaultProps = {
    onToggle: () => {},
    collapsed: false,
  };
  handleCloseMenuLayout = e => {
    if (e.target.className.includes('menu-close')) {
      this.props.onToggle();
    }
    return null;
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.props.onToggle}>
          <Icon type={this.props.collapsed ? 'menu-fold' : 'menu-unfold'} />
        </Button>
        {this.props.collapsed ? (
          <MenuCloseEl
            className="menu-close"
            onClick={this.handleCloseMenuLayout}
          />
        ) : null}
      </div>
    );
  }
}