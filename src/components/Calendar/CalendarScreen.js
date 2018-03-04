import React, { Component } from 'react';
import * as moment from 'moment';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import { Modal, Button } from 'antd';
import 'react-dates/lib/css/_datepicker.css';

moment.updateLocale('ko', {
  week: {
    dow: 1,
  },
});
const datesList = [];

const data02 = [];
const COLORS = ['#61bf93', '#ededed'];
export default class CalendarScreen extends Component {
  static defaultState = {
    onClickDates: () => {},
  };

  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    mission: [],
  };

  componentWillReceiveProps() {
    const a = this.props.onClickDates();
    this.setState({
      mission: a,
    });
  }
  // 데이터 추가하는 코드 미완성
  // componentDidUpdate() {
  //   if (this.state.mission[0]) {
  //
  // for (let i = 0; i < 6; i++) {
  // console.log(moment(this.state.mission[0][0]).add(i, 'days'));
  // datesList.push(moment().add(3, 'days'));
  // }
  // console.log(datesList);
  //   }
  // }
  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    });
    for (let i = 0; i < this.state.mission.length; i++) {
      if (
        startDate.startOf('isoWeek').format('YYYY-[W]ww') ===
        this.state.mission[i][0]
      ) {
        const jang = this.state.mission[i][1];
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
            {/* <Pie
              data={data02}
              cx={200}
              cy={200}
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
            /> */}

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
      onOk() {
        data02.splice(0, data02.length);
      },
    });
  };
  // info = (jang, dates) => {
  //   const a = Object.entries(jang);
  //   Modal.info({
  //     title: '당신의 미션 정보입니다.',
  //     content: (
  //       <div>
  //         <p>{dates}</p>
  //         {a.map((person, index) => (
  //           <p key={index}>
  //             {person[0]}: {person[1].toString()}
  //           </p>
  //         ))}
  //       </div>
  //     ),
  //     onOk() {},
  //   });
  // };
  isSameDay = (a, b) => {
    if (!moment.isMoment(a) || !moment.isMoment(b)) {
      return false;
    }
    return (
      a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
    );
  };
  isDayHighlighted = day1 => datesList.some(day2 => this.isSameDay(day1, day2));
  render() {
    console.log(moment().isoWeekday());
    return (
      <div>
        <DayPickerRangeController
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          startDateOffset={day => day.startOf('isoWeek')}
          endDateOffset={day => day.endOf('isoWeek')}
          numberOfMonths={2}
        />
        <Modal>
          <Button onClick={this.info}>Info</Button>
        </Modal>
      </div>
    );
  }
}
