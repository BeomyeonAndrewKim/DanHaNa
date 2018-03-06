import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import CalendarScreen from '../../components/Calendar/CalendarScreen';
import { fetchTodoList } from '../../ducks/calendar';

class CalendarScreenContainer extends Component {
  static defaultProps = {
    todoList: [],
    onTodoList: () => {},
    loading: '',
  };
  componentWillMount() {
    this.props.onTodoList();
  }
  handleClickDates = () => {
    const { todoList } = this.props;
    return todoList;
  };
  render() {
    return (
      <div>
        <CalendarScreen onClickDates={this.handleClickDates} />
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.calendar.loading,
    todoList: state.calendar.todoList,
  }),
  dispatch => ({
    onTodoList: () => {
      dispatch(fetchTodoList());
    },
  }),
)(CalendarScreenContainer);
