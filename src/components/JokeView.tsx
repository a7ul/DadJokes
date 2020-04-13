import { Text, View, Button, useEventHandler } from "@nodegui/react-nodegui";
import React, { useEffect, useState, useCallback } from "react";
import { getJoke } from "../services/jokes";
import {
  QPushButtonSignals,
  QApplication,
  QClipboardMode,
  QMessageBox,
  QPushButton,
} from "@nodegui/nodegui";

function onError(error: Error) {
  console.log(error);
  const errorBox = new QMessageBox();
  const closeButton = new QPushButton();
  closeButton.setText("Close");
  closeButton.addEventListener("clicked", () => {
    errorBox.close();
  });
  errorBox.setStyleSheet(`
    QLabel{
      qproperty-alignment: 'AlignCenter';
    }
  `);
  errorBox.setText(`${error.name} 🐞`);
  errorBox.setInformativeText(error.message);
  errorBox.setDetailedText(error.stack || "Unknown error: " + error.name);
  errorBox.addButton(closeButton);
  errorBox.exec();
}

export function JokeView() {
  const [jokeText, setJokeText] = useState<string>(`Loading...`);
  const [copyBtnText, setCopyBtnText] = useState<string>(`📝 Copy`);

  const setNewJoke = useCallback(async () => {
    try {
      setJokeText("loading...");
      const joke = await getJoke();
      setJokeText(joke.joke);
    } catch (err) {
      onError(err);
    }
  }, []);

  const anotherJokeBtnHandler = useEventHandler<QPushButtonSignals>(
    { clicked: () => setNewJoke() },
    []
  );

  const copyBtnHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        QApplication.clipboard().setText(jokeText, QClipboardMode.Clipboard);
        setCopyBtnText(`🤘 Copied!`);
        setTimeout(() => {
          setCopyBtnText(`📝 Copy`);
        }, 1000);
      },
    },
    [jokeText]
  );

  useEffect(() => {
    setNewJoke();
  }, []);

  return (
    <View id="joke-view" styleSheet={containerStyleSheet}>
      <Text id="joke" wordWrap={true}>
        {jokeText}
      </Text>
      <View style={buttonAreaStyle}>
        <Button on={copyBtnHandler} text={copyBtnText} />
        <Button on={anotherJokeBtnHandler} text="😂 Another One?" />
      </View>
    </View>
  );
}

const containerStyleSheet = `
  #joke-view { 
    padding: 20;
    align-items: 'center';
    justify-content: 'center';
  }
  #joke {
    qproperty-alignment: 'AlignCenter';
    min-height: 120px;
  }
`;

const buttonAreaStyle = `
  flex-direction: 'row';
  align-items: 'center';
  justify-content: 'center';
`;

const innerContainerStyle = `
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
  border: 1px solid yellow;
`;
