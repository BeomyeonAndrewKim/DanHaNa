import reducer, { LOADING, LOADED, loadingMenu, loadedMenu } from './menu';

describe('article', () => {
  it('loadingMenu Action Test', () => {
    const action = loadingMenu();
    expect(action).toEqual({
      type: LOADING,
    });
  });
  it('loadedMenu Action Test', () => {
    const action = loadedMenu({ a: '111' });
    expect(action).toEqual({
      type: LOADED,
      profileInfo: { a: '111' },
    });
  });
  it('loadingMenu Reducer Test', () => {
    const state = reducer(undefined, loadingMenu());
    expect(state).toEqual({
      loading: true,
      profileInfo: {},
    });
  });
  it('loadedMenu Reducer Test', () => {
    const state = reducer(undefined, loadedMenu({ a: '111' }));
    expect(state).toEqual({
      loading: false,
      profileInfo: { a: '111' },
    });
  });
});
