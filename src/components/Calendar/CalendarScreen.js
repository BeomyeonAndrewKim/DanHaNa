import React, { Component } from 'react';
import * as moment from 'moment';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import styled from 'styled-components';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import { Modal, Button } from 'antd';
import 'react-dates/lib/css/_datepicker.css';
import CalendarHeader from './CalendarHeader';
import './react_dates_overrides.css';

const CalendarWrap = styled.div`
  text-align: center;
  height: 100vh;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#dc7036+50,c45b2d+50 */
  background: #dc7036; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #dc7036 50%,
    #c45b2d 50%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr='#dc7036',
      endColorstr='#c45b2d',
      GradientType=1
    ); /* IE6-9 fallback on horizontal gradient */
`;

moment.updateLocale('ko', {
  week: {
    dow: 1,
  },
});

const COLORS = ['#61bf93', '#ededed'];
export default class CalendarScreen extends Component {
  static defaultState = {
    todoList: [],
    onDatesChange: () => {},
    startDateOffset: () => {},
    endDateOffset: () => {},
    isDayHighlighted: () => {},
  };

  state = {
    startDate: null,
    endDate: null,
    datesList: [moment(), moment().add(1, 'days')],
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    });
    const mission = this.props.todoList;
    for (let i = 0; i < mission.length; i++) {
      if (startDate.startOf('isoWeek').format('YYYY-[W]ww') === mission[i][0]) {
        const jang = mission[i][1];
        const dates = `
            ${startDate.isoWeekday(1).format('YYYY-MM-DD')}~
            ${endDate.isoWeekday(7).format('YYYY-MM-DD')}`;
        this.info(jang, dates);
      }
    }
  };
  info = (jang, dates) => {
    const { complete, curstep, memo, steps, todo } = jang;
    const achievement = Math.floor(curstep / steps * 100);
    const data02 = [];
    data02.splice(0, data02.length);
    data02.push(
      { name: '실행 횟수', value: curstep },
      { name: '남은 횟수', value: steps - curstep },
    );
    Modal.info({
      title: '당신의 미션 정보입니다.',
      content: (
        <div>
          <p>{dates}</p>
          <p>목표: {todo}</p>
          <p>메모: {memo}</p>
          <p>설정 횟수: {steps}</p>
          <p>실행 횟수: {curstep}</p>
          <p>목표 달성률: {achievement}%</p>
          <p>미션 : {complete ? '성공' : '실패'}</p>
          <PieChart width={400} height={400}>
            <Pie
              data={data02}
              cx={100}
              cy={100}
              innerRadius={55}
              outerRadius={60}
              textAnchor="end"
              dataKey="value"
              label
            >
              <Label
                value={`달성률: ${achievement}%`}
                offset={0}
                position="center"
              />
              {data02.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
          </PieChart>
        </div>
      ),
    });
  };
  isSameDay = (a, b) => {
    if (!moment.isMoment(a) || !moment.isMoment(b)) {
      return false;
    }
    return (
      a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
    );
  };
  isDayHighlighted = day1 =>
    this.state.datesList.some(day2 => this.isSameDay(day1, day2));
  aaa = () => {
    console.log(this.state.datesList);
    const list = this.props.todoList;
    const test = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j <= 6; j++) {
        test.push(moment(list[i][0]).add(j, 'days'));
        // test.push(moment().add(j, 'days'));
      }
    }
    this.setState({
      datesList: test,
    });
  };
  render() {
    // if (this.props.todoList.length !== this.state.datesList.length) {
    //   this.jang();
    // }
    console.log('z');
    return (
      <div>
        <CalendarWrap>
          <CalendarHeader />
          <DayPickerRangeController
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
            startDateOffset={day => day.startOf('isoWeek')}
            endDateOffset={day => day.endOf('isoWeek')}
            numberOfMonths={1}
            enableOutsideDays
            isDayHighlighted={this.isDayHighlighted}
            hideKeyboardShortcutsPanel
          />
        </CalendarWrap>
        <Modal>
          <Button onClick={this.info}>Info</Button>
        </Modal>
        <p onClick={this.aaa}>asdfasdfasdf</p>
      </div>
    );
  }
}
