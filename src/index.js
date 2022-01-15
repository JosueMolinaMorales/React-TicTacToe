import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Function that returns the render of an individual square
 * @param {*} props React Prop
 * @returns 
 */
function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function PlayAgain(props) {
    return (
        <button className='play-again' onClick={props.onClick}>
            Play Again?
        </button>
    )
}
 
/**
 * React Component that renders the tic-tac-toe board using the square component
 */
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    /**
     * Handles when a button has been clicked
     * 
     * @param {*} i the index of the square that has been clicked
     * @returns 
     */
    handleClick(i) {
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || calculateTie(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    playAgain() {
        const squares = this.state.squares.slice();
        squares.fill(null);
        this.setState({
            squares: squares,
            xIsNext: true,
        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    renderPlayAgainButton() {
        return <PlayAgain onClick={() => this.playAgain()} />;
    }
  
    render() {
        const isTied = calculateTie(this.state.squares);
        const winner = calculateWinner(this.state.squares); 
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        }else if(isTied) {
            status = "Game is tied!";
        }else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            <div hidden={!winner && !isTied}>
                {this.renderPlayAgainButton()}
            </div>
            </div>
      );
    }
  }

/**
 * React component that renders the game 
 */
class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
      for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
      }
      return null;
  }
  
  function calculateTie(squares) {
      for(let i = 0; i < squares.length; i++) {
          if(!squares[i]){
              return false;
          }
      }
      return true;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  