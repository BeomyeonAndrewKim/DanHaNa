import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
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
    completeData: null,
    stepsDataPie: null,
    stepsDataLine: null,
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
    this.props.todoList.filter(el => {
      if (this.state.startValue && this.state.endValue) {
        return moment(el[0]).isBetween(
          this.state.startValue,
          this.state.endValue,
          'week',
          '[]',
        );
      } else if (this.state.monthValue) {
        return moment(el[0]).isBetween(
          this.state.monthValue[0],
          this.state.monthValue[1],
          null,
          'week',
          '[]',
        );
      } else if (this.state.yearValue) {
        return moment(el[0]).isBetween(
          this.state.yearValue[0],
          this.state.yearValue[1],
          null,
          'week',
          '[]',
        );
      }
      return null;
    });

  handleAnimateData = Data => {
    const options = {
      useEasing: true,
      useGrouping: true,
    };
    document.querySelector(
      '.DashboardScreen__main--data--wrapper',
    ).style.display =
      'block';
    const animateCompleteData = new CountUp(
      document.querySelector('.DashboardScreen__main--data--completeData'),
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
    if (chosenComplete.length === 0) {
      Modal.warning({
        title: '기간을 선택해주세요.',
      });
    } else {
      const completeData = Math.round(
        chosenComplete.filter(el => el === true).length /
          chosenComplete.length *
          100,
      );
      const onlyCompletedData = chosenComplete.filter(el => el === true);
      const completeDataforPie = [
        { name: '미션 성공', value: onlyCompletedData.length },
        {
          name: '미션 실패',
          value: chosenComplete.length - onlyCompletedData.length,
        },
      ];
      this.handleAnimateData(completeData);
      this.setState({
        completeData: completeDataforPie,
        stepsDataLine: null,
        stepsDataPie: null,
      });
    }
  };

  handleCompleteStepsData = () => {
    const chosenCompleteStpesData = this.makeChosenDataArr().map(
      el => el[1].curstep / el[1].steps * 100,
    );
    if (chosenCompleteStpesData.length === 0) {
      Modal.warning({
        title: '기간을 선택해주세요.',
      });
    } else {
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
        { name: '총 단계 평균', value: stepsData },
        { name: '달성된 단계 평균', value: curStepData },
      ];
      this.handleAnimateData(completeStepsData);
      this.setState({
        completeData: null,
        stepsDataPie: stepsDataforPie,
        stepsDataLine: null,
      });
    }
  };

  handleCompleteStepsDataforLine = () => {
    if (this.makeChosenDataArr().length === 0) {
      Modal.warning({
        title: '기간을 선택해주세요.',
      });
    } else {
      const stepsDataforLine = [];
      this.makeChosenDataArr()
        .map(el => [el[0], el[1].curstep / el[1].steps * 100])
        .forEach(el => {
          stepsDataforLine.push({
            date: moment(el[0]).format('YYYY-ww[th]'),
            AverageCompleteRate: el[1],
          });
        });
      this.setState({
        completeData: null,
        stepsDataPie: null,
        stepsDataLine: stepsDataforLine,
      });
      document.querySelector(
        '.DashboardScreen__main--data--wrapper',
      ).style.display =
        'none';
    }
  };

  render() {
    return (
      <DashboardScreenwithLoading
        {...this.state}
        completeData={this.state.completeData}
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
        handleCompleteStepsDataforLine={this.handleCompleteStepsDataforLine}
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
