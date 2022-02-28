import { BaseInitializer } from "./initializer/base-initializer";

export interface Autoimport {
  initializers: typeof BaseInitializer[];
}
