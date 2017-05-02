import PT from 'prop-types';

export const route = PT.oneOfType([PT.object, PT.element]);
export const routes = PT.oneOfType([route, PT.arrayOf(route)]);
