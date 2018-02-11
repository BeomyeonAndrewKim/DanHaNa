import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import styled from 'styled-components';

const CloseBtn = styled(Button)`
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-32px);
`;

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
          >
            <CloseBtn type="primary" onClick={this.props.onToggle}>
              <Icon type="close" />
            </CloseBtn>
          </MenuCloseEl>
        ) : null}
      </div>
    );
  }
}
