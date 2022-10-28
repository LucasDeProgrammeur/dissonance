import { Ora } from "ora";
import Client from "../structures/Client";
import Logger from "../structures/Logger";

type ClientOptions = {
  token: string;
  intents: any;
  logger: Logger;
};

type LoadingItem = {
  name: string;
  oraData: Ora;
};

type CommandRegistrarOptions = {
  client: Client;
  logger: Logger;
};

type CommandOptions = {
  executeFunc: any;
  client: Client;
};

type InteractionCreateOptions = {
  client: Client;
};

export {
  ClientOptions,
  LoadingItem,
  CommandRegistrarOptions,
  CommandOptions,
  InteractionCreateOptions,
};
