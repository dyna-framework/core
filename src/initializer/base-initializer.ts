import { BaseResource } from '../resources/base-resource'

/**
 * Base Initializer class
 */
export class BaseInitializer extends BaseResource {
  /**
   * Register (pre) function
   * @returns
   */
  async register() {
    return
  }

  /**
   * Boot (post) function
   * @returns
   */
  async boot() {
    return
  }

  /**
   * Index to execute (sequence)
   */
  static getInitializerIndex() {
    return 0
  }
}
