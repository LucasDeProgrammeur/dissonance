import { Ora } from "ora";
import Client from "../structures/Client";
import ConfigHandler from "../structures/ConfigHandler";
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
};

type CommandOptions = {
  executeFunc: any;
  client: Client;
};

type InteractionCreateOptions = {
  client: Client;
  config: ConfigHandler;
};

type Config = {
  owner: Number;
  botStatus: string;
  sendCommandSignaturesToDiscord: string;
};

export {
  ClientOptions,
  LoadingItem,
  CommandRegistrarOptions,
  CommandOptions,
  InteractionCreateOptions,
  Config,
};
