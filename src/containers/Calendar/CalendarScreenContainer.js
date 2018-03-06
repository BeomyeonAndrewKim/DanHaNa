import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarScreen from '../../components/Calendar/CalendarScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchTodoList } from '../../ducks/calendar';

const CalendarScreenwithLoading = withLoadingIndicator(CalendarScreen);
class CalendarScreenContainer extends Component {
  static defaultProps = {
    todoList: [],
    onTodoList: () => {},
    loading: '',
  };
  state = {};
  componentDidMount() {
    this.props.onTodoList();
  }
  render() {
    const { todoList, ...rest } = this.props;
    return (
      <div>
        <CalendarScreenwithLoading todoList={todoList} />
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
