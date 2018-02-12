import reducer, {
  TOGGLE,
  LOADING,
  LOADED,
  toggleMenu,
  loadingMenu,
  loadedMenu,
} from './menu';

describe('article', () => {
  it('toggleMenu Action Test', () => {
    const action = toggleMenu();
    expect(action).toEqual({
      type: TOGGLE,
    });
  });
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
  it('toggleMenu Reducer Test', () => {
    const state = reducer(undefined, toggleMenu());
    expect(state).toEqual({
      collapsed: true,
      loading: false,
      profileInfo: {},
    });
  });
  it('loadingMenu Reducer Test', () => {
    const state = reducer(undefined, loadingMenu());
    expect(state).toEqual({
      collapsed: false,
      loading: true,
      profileInfo: {},
    });
  });
  it('loadedMenu Reducer Test', () => {
    const state = reducer(undefined, loadedMenu({ a: '111' }));
    expect(state).toEqual({
      collapsed: false,
      loading: false,
      profileInfo: { a: '111' },
    });
  });
});
