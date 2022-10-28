import ora from "ora";
import { LoadingItem } from "../types/standardTypes";

class Logger {
  currentLoaders: Array<LoadingItem>;

  constructor() {
    this.currentLoaders = [];
  }

  addLoader (name: string, loadingValue: string)  {
    let oraSpinner = ora(loadingValue);
    this.currentLoaders.push({ name: name, oraData: oraSpinner });
    oraSpinner.start();
  };

  loaderSucceed (name: string, succeedValue: string)  {
    let instance = this.currentLoaders.find(e => e.name === name);
    instance?.oraData.succeed(succeedValue);
  }

  loaderFailure (name: string, failureValue: string) {
    let instance = this.currentLoaders.find(e => e.name === name);
    instance?.oraData.fail(failureValue)
  }
}

export default Logger;
