import React, { Component } from 'react';
import { Form, Input, Tooltip, Modal, Icon, Card } from 'antd';

const title = '2 ~ 20자 이상 한글과 영문으로만 입력해주세요.';

export default class ProfileNickName extends Component {
  static defaultProp = {
    nickName: '',
    handleNickNameChange: () => {},
    handleNickNameEditSave: () => {},
  };
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.props.handleNickNameEditSave();
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { nickName, handleNickNameChange } = this.props;
    return (
      <div>
        <Card
          title="닉네임"
          style={{ margin: '0 30px' }}
          type="inner"
          bordered={false}
        >
          <button onClick={this.showModal} style={{ border: 'none' }}>
            <span
              style={{ fontSize: '1.2em', fontWeight: 'bold', marginRight: 5 }}
            >
              {nickName}
            </span>
            <Icon style={{ opacity: 0.5 }} type="edit" />
          </button>
          <Modal
            title="닉네임을 입력해 주세요."
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form layout="inline">
              <Tooltip trigger={['focus']} title={title}>
                <Input
                  onChange={handleNickNameChange}
                  defaultValue={nickName}
                />
              </Tooltip>
            </Form>
          </Modal>
        </Card>
        <Card
          title="로그인 정보"
          style={{ margin: '0 30px' }}
          type="inner"
          bordered={false}
        >
          페이스북이나 구글입니다
        </Card>
      </div>
    );
  }
}
