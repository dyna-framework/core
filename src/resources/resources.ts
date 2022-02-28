import * as fs from 'fs';
import * as path from 'path';

export interface Resource {
  path: string;
  object: any;
}

export class Resources {

  private container: Resource[] = [];

  loadFromDir(dir: string, recursive: boolean = false) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        const required = require(filePath);
        const resources: Resource[] = [];

        for (const key in required) {
          const obj = required[key];

          resources.push({
            path: filePath,
            object: obj,
          });
        }
        
        this.merge(resources);
      } else if (stat.isDirectory() && recursive) {
        this.loadFromDir(filePath);
      }
    }
  }

  all() {
    return this.container;
  }

  only(type: string) {
    return this.all().filter(e => e.object.INTERNAL_RESOURCE_TYPE === type);
  }

  push(resource: Resource) {
    this.container.push(resource);
    return this.container;
  }

  merge(arr: Resource[]) {
    this.container = this.container.concat(arr);
    return this.container;
  }

}
