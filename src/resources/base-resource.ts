import { Application } from "../application";

/**
 * Base resource class
 */
export class BaseResource {

  /**
   * Application instance
   */
  public app: Application|null = null;

  /**
   * Set the application instance
   * @param app application instance
   * @returns resource instance
   */
  setApplication(app: Application) {
    this.app = app;
    return this;
  }

  /**
   * Get the application instance
   * @returns Application instance
   */
  getApplication() {
    return this.app;
  }

}
