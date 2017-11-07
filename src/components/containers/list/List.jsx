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
      <div className="page" data-page="list">list</div>
    );
  }
}

export default Index;
