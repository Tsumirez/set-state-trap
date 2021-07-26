import logo from "./logo.svg";
import { Component } from "react";
import "./App.css";

class App extends Component {

  //if you ever need to use props inside constructor, be sure to pass'em to it.
  //using them in super call also does not hurt
  constructor(props) {
    super(props);
    this.state = {
      num: 42 + this.props.increment
    };

    this.props = props;
  }

  //if you have no need for constructor (for doing initialization logic or/and receiving props)
  //you can just skip all together and initialize state as a class field:
  //state = { num: 42}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.num}</p>
          {/* IT'S A TARP! This works fine..normally. But has a pitfall.
              If more than one place in app wants to update same state there is a risk of them 
              all or at least some getting outdated state, as react does not immediately update state after calling
              setState, but likes to batch such calls. The second function argument in setState is great for reading updated value,
              BUT NOT setting it safely. 
              Imagine this code getting run thrice in different places. Each call could get num val of 42, update it to 43,
              and be done with it, ending with num val of 43 despite calling for updates 3 times (which should end with 45) */}

          {/*<button onClick={()=> this.setState({num: this.state.num + 1},()=> console.log(this.state.num))}> Increase</button>*/}
        
          {/* And here is the SAFE way. use function instead of just passing a new object into setState.
              This time the state given as prevState argument is the most recent one, including freshest updates to it's value.
              Done this way the result will be the proper 45 value.
              TL;DR - use function when updating state requires you to use props or it's previous value. If not you're safe to just
              slab a new object in there.
          */}
          <button onClick={() => this.setState((prevState,prevProps) => ({num: prevState.num+ prevProps.increment}),() => console.log(this.state.num))}>Increment</button>
        
        </header>
      </div>
    );
  }
}

export default App;
