import * as dotenv from 'dotenv';

export default class EnvConfig {
  private readonly envPath: string;

  constructor(envPath: string) {
    this.envPath = envPath;
  }

  public init() {
    dotenv.config({
      path: this.envPath,
    });
  }
}
