import { BaseInitializer } from "./initializer/base-initializer";
import { Resources } from "./resources/resources";
import { Autoimport } from "./autoimport";
import * as fs from 'fs';
import * as path from 'path';

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
   * Package.json path
   */
  public pkgPath?: string;

  /**
   * Libraries path
   */
  public librariesPath?: string;

  /**
   * Application instance
   * @param sourcePath 
   */
  constructor(sourcePath?: string, pkgPath?: string, librariesPath?: string) {
    this.sourcePath = sourcePath;
    this.pkgPath = pkgPath;
    this.librariesPath = librariesPath;

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
      const instance: BaseInitializer = new initializer() as BaseInitializer;
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
   * Autoimport dyna packages
   */
  public autoImport() {
    const dependencies: string[] = new Array().concat(this.dependenciesFromPackage()).concat(this.dependenciesFromLibraries());

    // Every dependency
    for (const dependency of dependencies) {
      const imp = require(dependency);
      const auto: Autoimport = imp.DynaAutoimport;

      if (!auto || !(auto.initializers instanceof Array)) {
        continue;
      }

      this.resources.merge(auto.initializers);
    }
  }

  public dependenciesFromPackage() {
    if (!this.pkgPath) {
      return [];
    }

    const appPkg = require(this.pkgPath);
    const dependencies = appPkg.dependencies || {};
    const result: string[] = [];

    for (const name in dependencies) {
      result.push(name);
    }

    return result;
  }

  public dependenciesFromLibraries() {
    if (!this.librariesPath) {
      return [];
    }

    return fs.readdirSync(this.librariesPath).map(libraryName => {
      const pkgFile = path.join(this.librariesPath as string, libraryName, 'package.json');
      const pkgData = require(pkgFile);

      return pkgData.name;
    });
  }

}
