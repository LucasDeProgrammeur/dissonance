import { Ora } from "ora";
import Client from "../structures/Client";
import ConfigHandler from "../structures/ConfigHandler";
import Logger from "../structures/Logger";
import DBHandler from "../structures/DBHandler";
import ChannelUpdater from "../structures/ChannelUpdater";

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
  db: DBHandler;
  channelUpdater: ChannelUpdater;
};

type CommandOptions = {
  executeFunc: any;
  client: Client;
  db: DBHandler;
  channelUpdater: ChannelUpdater;
};

type InteractionCreateOptions = {
  client: Client;
  config: ConfigHandler;
};

type Config = {
  owner: Number;
  botStatus: string;
  sendCommandSignaturesToDiscord: string;
  enableDB: boolean;
  enableChannelUpdates: boolean;
};

type ChannelUpdate = {
  id: number;
  channelId: string;
  channelUpdateName: string;
  title: string;
  interval: number;
  createdAt: string;
  updatedAt: string;
}

export {
  ClientOptions,
  LoadingItem,
  CommandRegistrarOptions,
  CommandOptions,
  InteractionCreateOptions,
  Config,
  ChannelUpdate
};
