import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => <div className="container">{children}</div>;

Container.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
