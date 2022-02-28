import { BaseResource } from "../resources/base-resource";

/**
 * Base Initializer class
 */
export class BaseInitializer extends BaseResource {

  /**
   * Resource type (internal use)
   */
  static INTERNAL_RESOURCE_TYPE = '@dyna:initializer';

  /**
   * Register (pre) function
   * @returns 
   */
  async register() {
    return;
  }

  /**
   * Boot (post) function
   * @returns 
   */
  async boot() {
    return;
  }

}
