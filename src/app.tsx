import { Window, hot } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import { JokeView } from "./components/JokeView";
import nodeguiIcon from "../assets/nodegui.jpg";

const minSize = { width: 320, height: 200 };
const winIcon = new QIcon(nodeguiIcon);
class App extends React.Component {
  render() {
    return (
      <Window
        windowIcon={winIcon}
        windowTitle="👨‍🦳 Dad Jokes 😂"
        minSize={minSize}
      >
        <JokeView />
      </Window>
    );
  }
}

export default hot(App);
