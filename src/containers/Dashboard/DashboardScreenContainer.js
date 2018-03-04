import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CountUp from 'countup.js';
import DashboardScreen from '../../components/Dashboard/DashboardScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';
import { fetchTodoList } from '../../ducks/calendar';

const DashboardScreenwithLoading = withLoadingIndicator(DashboardScreen);
class DashboardScreenContainer extends Component {
  static defaultProps = {
    todoList: [],
    loading: false,
  };

  state = {
    startValue: null,
    endValue: null,
    startWeek: '',
    endWeek: '',
    chosenWeek: [],
    endOpen: false,
  };

  componentWillMount() {
    this.props.onLoadTodoList();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    if (value) {
      this.setState({
        startWeek: value.startOf('isoWeek').unix(),
      });
    }
    this.setState({
      startValue: value,
    });
  };

  onEndChange = value => {
    if (value) {
      this.setState({
        endWeek: value.startOf('isoWeek').unix(),
      });
    }
    this.setState({
      endValue: value,
    });
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    const date = moment().isoWeekday(7);

    return (
      startValue.valueOf() > endValue.valueOf() ||
      startValue.valueOf() >= date.valueOf()
    );
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    const date = moment().isoWeekday(7);
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      endValue.valueOf() >= date.valueOf()
    );
  };
  disabledDate = current => {
    if (!current) {
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() > date.valueOf(); // can not select days before today
  };
  makeChosenDataArr = () =>
    this.props.todoList
      .map(el => [moment(el[0]).unix(), el[1]])
      .filter(
        el => this.state.startWeek <= el[0] && el[0] <= this.state.endWeek,
      );

  handleAnimateData = Data => {
    const options = {
      useEasing: true,
      useGrouping: true,
    };
    const animateCompleteData = new CountUp(
      document.querySelector('.DashboardScreen__main--completeData'),
      0,
      Data,
      0,
      2.5,
      options,
    );
    animateCompleteData.start();
  };

  handleCompleteData = () => {
    const chosenComplete = this.makeChosenDataArr().map(el => el[1].complete);
    const completeData = Math.round(
      chosenComplete.filter(el => el === true).length /
        chosenComplete.length *
        100,
    );
    this.handleAnimateData(completeData);
  };

  handleCompleteStepsData = () => {
    const chosenCompleteStpesData = this.makeChosenDataArr().map(
      el => el[1].curstep / el[1].steps * 100,
    );
    const completeStepsData =
      chosenCompleteStpesData.reduce((acc, item) => acc + item) /
      chosenCompleteStpesData.length;
    this.handleAnimateData(completeStepsData);
  };

  render() {
    return (
      <DashboardScreenwithLoading
        {...this.props}
        {...this.state}
        completeData={this.state.completeData}
        onChange={this.onChange}
        onStartChange={this.onStartChange}
        onEndChange={this.onEndChange}
        handleStartOpenChange={this.handleStartOpenChange}
        handleEndOpenChange={this.handleEndOpenChange}
        disabledStartDate={this.disabledStartDate}
        disabledEndDate={this.disabledEndDate}
        handleCompleteData={this.handleCompleteData}
        handleCompleteStepsData={this.handleCompleteStepsData}
      />
    );
  }
}

export default connect(
  state => ({
    loading: state.calendar.loading,
    todoList: state.calendar.todoList,
  }),
  dispatch => ({
    onLoadTodoList: () => dispatch(fetchTodoList()),
  }),
)(DashboardScreenContainer);
