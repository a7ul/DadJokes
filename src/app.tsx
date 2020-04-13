import { Window, hot } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import { JokeView } from "./components/JokeView";

const minSize = { width: 320, height: 200 };
class App extends React.Component {
  render() {
    return (
      <Window windowTitle="👨‍🦳 Dad Jokes 😂" minSize={minSize}>
        <JokeView />
      </Window>
    );
  }
}

export default hot(App);
