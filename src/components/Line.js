import React from "react";

class Line extends React.Component {
  render() {
    return <div className="line">{`${this.props.message}`}</div>;
  }
}

export default Line;
