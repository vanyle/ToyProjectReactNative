/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../Cocktail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Cocktail from '../Cocktail';

it('renders correctly', () => {
  const tree = renderer.create(<Cocktail />).toJSON();
  expect(tree).toMatchSnapshot();
});
