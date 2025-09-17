// 高级类型定义示例

// 1. 接口定义
export interface Animal {
  name: string;
  age: number;
  makeSound(): string;
}

export interface Flyable {
  fly(): void;
}

export interface Swimmable {
  swim(): void;
}

// 2. 泛型接口
export interface Repository<T> {
  findById(id: string): T | null;
  save(entity: T): T;
  delete(id: string): boolean;
  findAll(): T[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

// 3. 泛型约束
export interface HasId {
  id: string;
}

export interface EntityRepository<T extends HasId> {
  findById(id: string): T | null;
  save(entity: T): T;
  delete(id: string): boolean;
}

// 4. 条件类型
export type NonNullable<T> = T extends null | undefined ? never : T;
export type Flatten<T> = T extends (infer U)[] ? U : T;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// 5. 映射类型
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 6. 模板字面量类型
export type EventName<T extends string> = `on${Capitalize<T>}`;
export type CSSProperty<T extends string> = `--${T}`;
export type DatabaseTable<T extends string> = `${T}_table`;

// 7. 递归类型
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 8. 函数类型
export type EventHandler<T = any> = (event: T) => void;
export type AsyncFunction<T, R> = (arg: T) => Promise<R>;
export type Predicate<T> = (value: T) => boolean;
export type Transformer<T, R> = (value: T) => R;

// 9. 装饰器类型
export type ClassDecorator = <T extends new (...args: any[]) => any>(target: T) => T | void;
export type MethodDecorator = <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
export type PropertyDecorator = (target: any, propertyKey: string | symbol) => void;
export type ParameterDecorator = (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => void;

// 10. 模块声明
export interface Window {
  myCustomProperty: string;
}

declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// 11. 命名空间
export namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }
  
  export function multiply(a: number, b: number): number {
    return a * b;
  }
  
  export const PI = 3.14159;
}

// 12. 混合类型
export interface Counter {
  (): number;
  increment(): void;
  decrement(): void;
  value: number;
}

// 13. 索引访问类型
export type User = {
  id: string;
  name: string;
  email: string;
  profile: {
    age: number;
    avatar: string;
  };
};

export type UserProfile = User['profile'];
export type UserEmail = User['email'];
export type UserKeys = keyof User;

// 14. 条件类型与infer
export type ArrayElement<T> = T extends (infer U)[] ? U : never;
export type PromiseValue<T> = T extends Promise<infer U> ? U : never;
export type FirstArgument<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never;

// 15. 工具类型组合
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
