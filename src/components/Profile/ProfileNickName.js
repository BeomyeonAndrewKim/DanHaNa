import React, { Component } from 'react';
import { Form, Input, Tooltip, Modal, Icon, Card } from 'antd';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

const title = '2 ~ 20자 이상 한글과 영문으로만 입력해주세요.';

export default class ProfileNickName extends Component {
  static defaultProp = {
    profileInfo: {},
    loading: '',
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
    this.props.handleCancelClicked();
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    // console.log(this.props);
    const { handleNickNameChange, profileInfo, loading } = this.props;
    return (
      <div className="profile__text__nickname">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Card
            className="profile__text__nickname__card"
            title="닉네임"
            type="inner"
            bordered={false}
          >
            <button
              className="profile__text__nickname__card__button"
              onClick={this.showModal}
            >
              <span className="profile__text__nickname__card__button__text">
                {profileInfo.nickName}
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
                    maxLength={20}
                    onChange={handleNickNameChange}
                    defaultValue={profileInfo.nickName}
                  />
                </Tooltip>
              </Form>
            </Modal>
          </Card>
        )}
      </div>
    );
  }
}
