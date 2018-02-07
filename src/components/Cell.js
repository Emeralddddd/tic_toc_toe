import React from "react";

class Cell extends React.Component {
  render() {
    const value = this.props.state;
    return (
      <div onClick={this.props.onPress} className={this.props.winner ? "winning-cell" : "cell"}>
        {this.props.state}
      </div>
    );
  }
}

export default Cell;
