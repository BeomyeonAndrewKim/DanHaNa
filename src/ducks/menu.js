export const COLLAPSE = 'menu/COLLAPSE';
export const TOGGLE = 'menu/TOGGLE';

export function toggleMenu() {
  return {
    type: TOGGLE,
  };
}

const initialState = {
  collapsed: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE:
      return {
        collapsed: !state.collapsed,
      };
    default:
      return state;
  }
}
