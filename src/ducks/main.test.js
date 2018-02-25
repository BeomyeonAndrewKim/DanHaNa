import reducer, {
  LOADING,
  LOADED_BOTH,
  LOADED_USER,
  LOADED_TODO,
  loadedUserInfo,
  loadedTodoInfo,
  loadedBothInfo,
  loading,
} from './main';

describe('article', () => {
  it('LOADING Action Test', () => {
    const action = loading();
    expect(action).toEqual({
      type: LOADING,
    });
  });
  it('LOADED_USER Action Test', () => {
    const action = loadedUserInfo({ a: '111' });
    expect(action).toEqual({
      type: LOADED_USER,
      userInfo: { a: '111' },
    });
  });
  it('LOADED_TODO Action Test', () => {
    const action = loadedTodoInfo({ b: '222' });
    expect(action).toEqual({
      type: LOADED_TODO,
      todoInfo: { b: '222' },
    });
  });
  it('LOADED_BOTH Action Test', () => {
    const action = loadedBothInfo({ a: '111' }, { b: '222' });
    expect(action).toEqual({
      type: LOADED_BOTH,
      userInfo: { a: '111' },
      todoInfo: { b: '222' },
    });
  });
  it('loadedUserInfo Reducer Test', () => {
    const state = reducer(undefined, loadedUserInfo({ b: 222 }));
    expect(state).toEqual({
      loading: false,
      todoInfo: {},
      userInfo: { b: 222 },
    });
  });
  it('loadedTodoInfo Reducer Test', () => {
    const state = reducer(undefined, loadedTodoInfo({ a: '111' }));
    expect(state).toEqual({
      loading: false,
      userInfo: {},
      todoInfo: { a: '111' },
    });
  });
  it('loadedBothInfo Reducer Test', () => {
    const state = reducer(
      undefined,
      loadedBothInfo({ a: '111' }, { b: '222' }),
    );
    expect(state).toEqual({
      loading: false,
      userInfo: { a: '111' },
      todoInfo: { b: '222' },
    });
  });
});
