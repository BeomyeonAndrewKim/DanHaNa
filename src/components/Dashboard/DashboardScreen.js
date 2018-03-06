import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, DatePicker, Button, Menu, Dropdown } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Bar,
  YAxis,
  XAxis,
  BarChart,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import './DashboardScreen.css';

const { WeekPicker, RangePicker } = DatePicker;
moment.locale('ko', {
  week: {
    dow: 1,
  },
});
const COLORS = ['#61bf93', '#ededed'];

export default class DashboardScreen extends Component {
  static defaultProps = {
    startValue: null,
    endValue: null,
    endOpen: false,
    disabledStartDate: () => {},
    onStartChange: () => {},
    handleStartOpenChange: () => {},
    disabledEndDate: () => {},
    onEndChange: () => {},
    handleEndOpenChange: () => {},
    handleCompleteData: () => {},
    handleCompleteStepsData: () => {},
    handlePanelChange: () => {},
  };

  state = {
    weekPicker: false,
    monthPicker: false,
    yearPicker: false,
  };
  handleDropDownList = info => {
    switch (info.key) {
      case '1':
        this.setState({
          weekPicker: true,
          monthPicker: false,
          yearPicker: false,
        });
        break;
      case '2':
        this.setState({
          weekPicker: false,
          monthPicker: true,
          yearPicker: false,
        });
        break;
      case '3':
        this.setState({
          weekPicker: false,
          monthPicker: false,
          yearPicker: true,
        });
        break;
      default:
    }
  };

  showCalendar = () => {
    const calendarStyle = {
      width: '10vw',
      height: '10vh',
    };
    if (this.state.weekPicker) {
      return (
        <div className="DashboardScreen__main__calendar--weekpicker">
          <WeekPicker
            size="small"
            popupStyle={calendarStyle}
            disabledDate={this.props.disabledStartDate}
            format="YYYY ww번째 주"
            value={this.props.startValue}
            placeholder="Start week"
            onChange={this.props.onStartChange}
            onOpenChange={this.props.handleStartOpenChange}
          />
          <WeekPicker
            size="small"
            popupStyle={calendarStyle}
            disabledDate={this.props.disabledEndDate}
            format="YYYY ww번째 주"
            value={this.props.endValue}
            placeholder="End week"
            onChange={this.props.onEndChange}
            open={this.props.endOpen}
            onOpenChange={this.props.handleEndOpenChange}
          />
        </div>
      );
    } else if (this.state.monthPicker) {
      return (
        <RangePicker
          size="small"
          popupStyle={calendarStyle}
          className="DashboardScreen__main__calendar--monthpicker"
          placeholder={['Start month', 'End month']}
          format="YYYY-MM"
          value={this.props.monthValue}
          mode={['month', 'month']}
          onPanelChange={this.props.handleMonthPanelChange}
        />
      );
    } else if (this.state.yearPicker) {
      return (
        <RangePicker
          size="small"
          popupStyle={calendarStyle}
          className="DashboardScreen__main__calendar--yearpicker"
          placeholder={['Start year', 'End year']}
          format="YYYY"
          value={this.props.yearValue}
          mode={['year', 'year']}
          onPanelChange={this.props.handleYearPanelChange}
        />
      );
    }
  };

  showPieChart = () => {
    if (this.props.completeData) {
      return (
        <div>
          <span className="DashboardScreen__main--data--completeData" />
          <ResponsiveContainer width="80%" height={400}>
            <PieChart width={400} height={400}>
              <Pie
                data={this.props.completeData}
                textAnchor="end"
                dataKey="value"
                label
              >
                {this.props.completeData.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (this.props.stepsDataPie) {
      return (
        <div>
          <span className="DashboardScreen__main--data--completeData" />
          <ResponsiveContainer width="100%" height={150}>
            <BarChart width={350} height={150} data={this.props.stepsDataPie}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" barSize={60} />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart width={730} height={250} data={this.props.stepsDataLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="AverageCompleteRate"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  render() {
    const menu = (
      <Menu onClick={this.handleDropDownList}>
        <Menu.Item key={1}>Week</Menu.Item>
        <Menu.Item key={2}>Month</Menu.Item>
        <Menu.Item key={3}>Year</Menu.Item>
      </Menu>
    );
    return (
      <div className="DashboardScreen">
        <div className="DashboardScreen__header">
          <Link to="/main">
            <Icon className="DashboardScreen__header__icon" type="arrow-left" />
          </Link>
          통계
        </div>
        <div className="DashboardScreen__main">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              Select Date Type <Icon type="down" />
            </a>
          </Dropdown>
          <div className="DashboardScreen__main__calendar">
            {this.showCalendar()}
          </div>
          <Button onClick={this.props.handleCompleteData}>
            기간내 목표 달성률
          </Button>
          <Button onClick={this.props.handleCompleteStepsData}>
            기간내 목표 단계별 달성률
          </Button>
          <div className="DashboardScreen__main--data">
            {this.showPieChart()}
          </div>
        </div>
      </div>
    );
  }
}
