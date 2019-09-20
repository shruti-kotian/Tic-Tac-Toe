import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true
    };
  }
  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares: squares }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  };

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const timeTravel = move ? `Go to move ${move}` : `Start the Game`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{timeTravel}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = "Next Player is " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="game">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          ></Board>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

const calculateWinner = squares => {
  let winningPath = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningPath.length; i++) {
    const [a, b, c] = winningPath[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
