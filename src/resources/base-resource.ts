import { Application } from '../application'

/**
 * Base resource class
 */
export class BaseResource {
  /**
   * Application instance
   */
  app: Application | null = null

  /**
   * Set the application instance
   * @param app application instance
   * @returns resource instance
   */
  setApplication(app: Application) {
    this.app = app
    return this
  }

  /**
   * Get the application instance
   * @returns Application instance
   */
  getApplication() {
    return this.app
  }

  /**
   * Get resource type (internal use)
   * @returns resource type
   */
  static getResourceType() {
    return '@dyna:resource'
  }

  /**
   * Is resource type (internal use)
   * @returns true or false
   */
  static isResourceType(type: string) {
    return this.getResourceType() === type
  }
}
