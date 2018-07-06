import React, { Component } from "react";
import PropTypes from "proptypes";
import { connect } from "react-redux";
import identity from "crocks/combinators/identity";
import "./App.css";
import { GameUI } from "./components/Game";
import intro from "./assets/intro.mp4";

class App extends Component {
  renderGame = () => {
    return (
      <GameUI
        game={this.props.game}
        players={this.props.players}
        onCorrectAnswer={this.props.onCorrectAnswer}
        onIncorrectAnswer={this.props.onIncorrectAnswer}
        onPlayerBuzz={this.props.onPlayerBuzz}
        onTileClick={this.props.onTileClick}
      />
    );
  };

  render() {
    const { game } = this.props;
    return (
      <div className="App">
        {game.cata({
          NotStarted: () => (
            <div onClick={this.props.playIntro}>Play Intro</div>
          ),
          Intro: () => (
            <div>
              <video
                src={intro}
                autoPlay={true}
                playsInline={true}
                className="intro"
                onEnded={() => this.props.startGame()}
              />
            </div>
          ),
          Selectable: this.renderGame,
          Asking: this.renderGame,
          Answering: this.renderGame,
          Complete: this.renderGame
        })}
      </div>
    );
  }
}

App.propTypes = {
  game: PropTypes.object,
  players: PropTypes.object,
  onCorrectAnswer: PropTypes.func,
  onTileClick: PropTypes.func,
  playIntro: PropTypes.func,
  startGame: PropTypes.func
};

const mapStateToProps = identity;
const mapDispatchToProps = dispatch => ({
  onCorrectAnswer: () => dispatch({ type: "CORRECT_ANSWER" }),
  onIncorrectAnswer: () => dispatch({ type: "INCORRECT_ANSWER" }),
  onPlayerBuzz: player => dispatch({ type: "BUZZER", payload: player }),
  onTileClick: char => dispatch({ type: "SELECT_TILE", payload: char }),
  playIntro: () => dispatch({ type: "PLAY_INTRO" }),
  startGame: () => dispatch({ type: "START" })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
