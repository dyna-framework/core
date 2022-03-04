import * as fs from 'fs'
import * as path from 'path'
import { BaseResource } from './base-resource'

/**
 * Resources into application
 */
export class Resources {
  /**
   * Array container
   */
  private container: typeof BaseResource[] = []

  /**
   * Load resources (files) from directory
   * @param dir folder path
   * @param recursive ĺoad files recursively
   */
  loadFromDir(dir: string, recursive: boolean = false) {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isFile()) {
        const required = require(filePath)
        const resources: typeof BaseResource[] = []

        for (const key in required) {
          const obj = required[key]
          resources.push(obj)
        }

        this.merge(resources)
      } else if (stat.isDirectory() && recursive) {
        this.loadFromDir(filePath, recursive)
      }
    }
  }

  /**
   * Get all resources
   * @returns resources loaded
   */
  all() {
    return this.container
  }

  /**
   * Get resources of type
   * @param type type resource
   * @returns resources loaded
   */
  only<T>(type: string): T[] {
    return this.all().filter((e) => e.isResourceType(type)) as any
  }

  /**
   * Push a resource
   * @param resource the resource instance
   * @returns array container
   */
  push(resource: typeof BaseResource) {
    this.container.push(resource)
    return this.container
  }

  /**
   * Merge resources with container
   * @param arr Array of resources
   * @returns array container
   */
  merge(arr: typeof BaseResource[]) {
    this.container = this.container.concat(arr)
    return this.container
  }
}
