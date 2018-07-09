import React, { Component } from "react";
import PropTypes from "proptypes";
import { connect } from "react-redux";
import identity from "crocks/combinators/identity";
import "./App.css";
import { GameUI } from "./components/Game";
import intro from "./assets/intro.mp4";

import sbg from "./assets/sbg-logo.png";
import blockbusters from "./assets/blockbusters.jpg";

class App extends Component {
  renderGame = () => {
    return (
      <GameUI
        game={this.props.game}
        players={this.props.players}
        onBlockBusters={this.props.onBlockBusters}
        onCorrectAnswer={this.props.onCorrectAnswer}
        onIncorrectAnswer={this.props.onIncorrectAnswer}
        onOneAway={this.props.onOneAway}
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
            <Splash onClick={this.props.playIntro}/>
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

class Splash extends Component {
  render() {
    return <div className="splash-screen">
      <h1 className="blockbusters" onClick={this.props.onClick}>Blockbusters</h1>
      <img className="logo" src={sbg} onClick={this.props.onClick} />
    </div>
  }
}

App.propTypes = {
  game: PropTypes.object,
  onBlockBusters: PropTypes.func,
  onCorrectAnswer: PropTypes.func,
  onOneAway: PropTypes.func,
  onTileClick: PropTypes.func,
  players: PropTypes.object,
  playIntro: PropTypes.func,
  startGame: PropTypes.func
};

const mapStateToProps = identity;
const mapDispatchToProps = dispatch => ({
  onCorrectAnswer: () => dispatch({ type: "CORRECT_ANSWER" }),
  onBlockBusters: () => dispatch({ type: "BLOCKBUSTERS" }),
  onIncorrectAnswer: () => dispatch({ type: "INCORRECT_ANSWER" }),
  onOneAway: player => dispatch({ type: "ONE_AWAY", payload: player }),
  onPlayerBuzz: player => dispatch({ type: "BUZZER", payload: player }),
  onTileClick: char => dispatch({ type: "SELECT_TILE", payload: char }),
  playIntro: () => dispatch({ type: "PLAY_INTRO" }),
  startGame: () => dispatch({ type: "START" })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
