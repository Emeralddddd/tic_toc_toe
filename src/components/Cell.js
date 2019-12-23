import React from "react";

class Cell extends React.Component {
  render() {
    return (
      <div className={this.props.winner ? "winning-cell" : "cell"}>
        {this.props.state}
      </div>
    );
  }
}

export default Cell;
