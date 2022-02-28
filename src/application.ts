import { BaseInitializer } from "./initializer/base-initializer";
import { Resources } from "./resources/resources";

/**
 * Extra data application interface
 */
export interface ExtraApplication {}

/**
 * Create an application instance
 */
export class Application {

  /**
   * Extra application data
   */
  ex: ExtraApplication = {};

  /**
   * Resources container
   */
  public resources: Resources = new Resources();

  /**
   * Source path (dir)
   */
  public sourcePath?: string;

  /**
   * Application instance
   * @param sourcePath 
   */
  constructor(sourcePath?: string) {
    this.sourcePath = sourcePath;

    if (sourcePath) {
      this.resources.loadFromDir(sourcePath, true);
    }
  }

  /**
   * Run/exec initializer classes from application source path
   */
  public async runInitializers() {
    const initializers = this.resources.only(BaseInitializer.INTERNAL_RESOURCE_TYPE);
    const instances: BaseInitializer[] = [];

    // Instance initializers
    for (const initializer of initializers) {
      const instance: BaseInitializer = new initializer.object();
      instances.push(instance.setApplication(this));
    }

    // Run "register" method
    for (const instance of instances) {
      await instance.register();
    }

    // Run "boot" method
    for (const instance of instances) {
      await instance.boot();
    }
  }

  /**
   * Run/exec initializer classes from path
   */
  public async runInitializersFromDir(dir: string) {
    const app = new Application(dir);
    return await app.runInitializers();
  }

}
