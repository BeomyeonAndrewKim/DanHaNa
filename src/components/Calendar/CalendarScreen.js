import React, { Component } from 'react';
import * as moment from 'moment';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import { Modal, Button } from 'antd';

import 'react-dates/lib/css/_datepicker.css';
import CalendarHeader from './CalendarHeader';
import './react_dates_overrides.css';
import './CalendarScreen.scss';

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
    datesList: [moment()],
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
            ${startDate.isoWeekday(1).format('YYYY-MM-DD')} ~
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
          <p className="calendar__mission__sub__dates">{dates}</p>
          <p className="calendar__mission__sub__item">
            <span className="calendar__mission__sub__title">목표</span>
            <span>{todo}</span>
          </p>
          <p className="calendar__mission__sub__item">
            <span className="calendar__mission__sub__title">메모</span>
            <span>{memo}</span>
          </p>
          <p className="calendar__mission__sub__item">
            <span className="calendar__mission__sub__title">설정 횟수</span>
            <span>{steps}</span>
          </p>
          <p className="calendar__mission__sub__item">
            <span className="calendar__mission__sub__title">실행 횟수</span>
            <span>{curstep}</span>
          </p>
          <p className="calendar__mission__sub__item">
            <span className="calendar__mission__sub__title">남은 횟수</span>
            <span>{steps - curstep}</span>
          </p>
          <p className="calendar__mission__sub__item">
            <span className="calendar__mission__sub__title">미션</span>
            <span>{complete ? '성공' : '실패'}</span>
          </p>
          <PieChart width={200} height={200}>
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
  render() {
    return (
      <div>
        <div className="calendar">
          <CalendarHeader />
          <h2 className="calendar__title">현재까지의 미션을 확인해보세요!</h2>
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
        </div>
        <Modal>
          <Button onClick={this.info}>Info</Button>
        </Modal>
      </div>
    );
  }
}
