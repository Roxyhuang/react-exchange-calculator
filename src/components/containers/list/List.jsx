import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <p className="test">Hello World</p>
    );
  }
}

export default Index;
