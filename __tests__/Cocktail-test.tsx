/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../cocktail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Cocktail from '../cocktail';

it('renders correctly', () => {
  const tree = renderer.create(<Cocktail />).toJSON();
  expect(tree).toMatchSnapshot();
});
