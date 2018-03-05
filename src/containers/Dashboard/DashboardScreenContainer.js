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
    endOpen: false,
    monthValue: null,
    yearValue: null,
    completeData: [],
    stepsData: [],
  };

  componentWillMount() {
    this.props.onLoadTodoList();
  }

  onStartChange = value => {
    this.setState({
      startValue: value,
      monthValue: null,
      yearValue: null,
    });
  };

  onEndChange = value => {
    this.setState({
      endValue: value,
      monthValue: null,
      yearValue: null,
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

  handleMonthPanelChange = monthValue => {
    this.setState({
      monthValue,
      startValue: null,
      endValue: null,
      yearValue: null,
    });
  };

  handleYearPanelChange = yearValue => {
    this.setState({
      yearValue,
      startValue: null,
      endValue: null,
      monthValue: null,
    });
  };
  makeChosenDataArr = () =>
    this.props.todoList.map(el => [moment(el[0]).unix(), el[1]]).filter(el => {
      if (this.state.startValue && this.state.endValue) {
        return (
          this.state.startValue.startOf('isoWeek').unix() <= el[0] &&
          el[0] <= this.state.endValue.startOf('isoWeek').unix()
        );
      } else if (this.state.monthValue) {
        return (
          this.state.monthValue[0].startOf('isoWeek').unix() <= el[0] &&
          el[0] <= this.state.monthValue[1].startOf('isoWeek').unix()
        );
      } else if (this.state.yearValue) {
        return (
          this.state.yearValue[0].startOf('isoWeek').unix() <= el[0] &&
          el[0] <= this.state.yearValue[1].startOf('isoWeek').unix()
        );
      }
    });

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
    const onlyCompletedData = chosenComplete.filter(el => el === true);
    const completeDataforPie = [
      { name: 'MissionSuccess', value: onlyCompletedData.length },
      {
        name: 'MissionFail',
        value: chosenComplete.length - onlyCompletedData.length,
      },
    ];
    this.setState({ completeData: completeDataforPie });
    this.handleAnimateData(completeData);
  };

  handleCompleteStepsData = () => {
    const chosenCompleteStpesData = this.makeChosenDataArr().map(
      el => el[1].curstep / el[1].steps * 100,
    );
    const completeStepsData =
      chosenCompleteStpesData.reduce((acc, item) => acc + item) /
      chosenCompleteStpesData.length;
    const stepsData = this.makeChosenDataArr()
      .map(el => el[1].steps)
      .reduce((acc, item) => (acc + item) / chosenCompleteStpesData.length);
    const curStepData = this.makeChosenDataArr()
      .map(el => el[1].curstep)
      .reduce((acc, item) => (acc + item) / chosenCompleteStpesData.length);
    const stepsDataforPie = [
      { name: 'Total Steps average', value: stepsData },
      { name: 'Step done average', value: curStepData },
    ];
    this.setState({ completeData: null, stepsData: stepsDataforPie });
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
        handleMonthPanelChange={this.handleMonthPanelChange}
        handleYearPanelChange={this.handleYearPanelChange}
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
