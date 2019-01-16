import React, { Component } from 'react';
import './App.css';
import chars from './chars.json'
import Wrapper from './components/Wrapper'
import Navnav from './components/Navnav'
import Title from './components/Title'
import CharCard from './components/CharCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        chars: chars,
        unselectedChars: chars
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectChar = name => {
        const findChar = this.state.unselectedChars.find(item => item.name === name);

        if(findChar === undefined) {
            // failure to select a new character
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                chars: chars,
                unselectedChars: chars
            });
        }
        else {
            // successful character selection
            const newChars = this.state.unselectedChars.filter(item => item.name !== name);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                chars: chars,
                unselectedChars: newChars
            });
        }

        this.shuffleArray(chars);
    };

    render() {
        return (
            <Wrapper>
                <Navnav
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.chars.map(char => (
                        <CharCard
                            name={char.name}
                            image={char.image}
                            selectChar={this.selectChar} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

