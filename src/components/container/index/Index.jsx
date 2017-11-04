import React from 'react';

class Check extends React.Component {
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
      <div className="page" data-page="my-page">123</div>
    );
  }
}

export default Check;
