import { Application } from "../application";

export class BaseResource {

  public app: Application|null = null;

  setApplication(app: Application) {
    this.app = app;
    return this;
  }

  getApplication() {
    return this.app;
  }

}
