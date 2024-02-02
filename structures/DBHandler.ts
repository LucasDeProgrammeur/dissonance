import { DataTypes, Model, Sequelize } from "sequelize";
import Logger from "./Logger";

class ChannelUpdate extends Model {}

class DBHandler {
  sequelize: Sequelize;
  constructor(logger?: Logger) {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "main.sqlite3",
    });
    try {
      this.sequelize.authenticate();
      console.log("Database connection made");
    } catch (e) {
      console.log("loadingDb ", "Could not authenticate the DB");
    }
  }

  async initChannelUpdates() {
    ChannelUpdate.init(
      {
        channelId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        channelUpdateName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        interval: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 500,
        },
      },
      {
        sequelize: this.sequelize, // We need to pass the connection instance
        modelName: "ChannelUpdate", // We need to choose the model name
      }
    );

    await this.sequelize.sync();
    // ChannelUpdate.findAll();

    return ChannelUpdate;
  }

  async getChannelUpdateRecords() {
    try {
      let update = await ChannelUpdate.findAll({ raw: true });
      return update;
    } catch (e) {
      return "cancelled";
    }
  }

  async addChannelUpdateRecord(
    channelId: string,
    channelUpdateName: string,
    title: string,
    interval: number
  ) {
    const update = await ChannelUpdate.create({
      channelId,
      channelUpdateName,
      title,
      interval,
    }).catch((e) => console.log(e));
  }
}

export default DBHandler;
