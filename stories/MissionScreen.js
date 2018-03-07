import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import MissionScreen from '../src/components/Mission/NextWeekMissionScreen';

const dummyTodoInfo = {
  todo: 'todo',
  memo: 'memo',
  steps: '10',
  fixcount: '10',
};

storiesOf('MissionScreen', module)
  .addDecorator(StoryRouter())
  .add('default', () => <MissionScreen nextWeek={dummyTodoInfo} />)
  .add('edit', () => <MissionScreen editTodo />);
