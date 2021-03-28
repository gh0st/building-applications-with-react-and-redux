import React from 'react';
import Header from './Header';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// note how with shallow render you search for the react component tag
it('contains 3 navlinks via shallow', () => {
  const numLinks = shallow(<Header />).find('NavLink').length;
  expect(numLinks).toEqual(3);
});

// note how with mount you search for the final rendered html since it generates
// the final dom. we also need to pull in react router's memoryRouter for
// testing since the header expects to have react router's props passed in.
it('contains 3 anchors via mount', () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find('a').length;

  expect(numAnchors).toEqual(3);
});
