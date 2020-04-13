import axios from "axios";

export type Joke = {
  id: string;
  joke: string;
  status: number;
};
export async function getJoke(): Promise<Joke> {
  const response = await axios.get("https://icanhazdadjoke.com/", {
    headers: {
      "User-Agent": "DadJokes NodeGui (https://github.com/nodegui/nodegui)",
      Accept: "application/json",
    },
  });
  return response.data;
}
