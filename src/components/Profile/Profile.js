import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input } from 'antd';

import ProfileHeader from './ProfileHeader';
import ProfilePhoto from './ProfilePhoto';
import './Profile.css';

const ProfileWrap = styled.div`
  text-align: center;
`;

const FormItem = Form.Item;

export default class Profile extends Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <ProfileWrap>
          <ProfileHeader />
          <ProfilePhoto />
          <div>
            <Form layout="inline">
              <FormItem label="Username">
                <Input />
              </FormItem>
            </Form>
          </div>
        </ProfileWrap>
      </div>
    );
  }
}
