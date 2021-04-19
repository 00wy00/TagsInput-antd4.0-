import React from 'react';
// import ReactDOM from 'react-dom'
const ReactDOM = require('react-dom')

const opt = document.body;

class Puppy extends React.Component {
    constructor(props: {} | Readonly<{}>) {
      super(props);
    }
    render() {
      return ReactDOM.createPortal(this.props.children,opt);
    }
  }

  export default Puppy
