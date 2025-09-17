// 泛型使用示例
import { Repository, ApiResponse, User } from '../types/advanced';

// 1. 基础泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用以避免未使用变量错误
identity<string>('hello');
identity<number>(42);
identity('world'); // TypeScript自动推断为string

// 2. 泛型约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: '张三', age: 25, email: 'zhangsan@example.com' };
getProperty(user, 'name'); // string
getProperty(user, 'age'); // number

// 3. 泛型接口实现
class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: string): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  save(user: User): User {
    const existingIndex = this.users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  findAll(): User[] {
    return [...this.users];
  }
}

// 4. 泛型类
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }

  remove(index: number): T | undefined {
    return this.items.splice(index, 1)[0];
  }
}

const stringContainer = new Container<string>();
stringContainer.add('hello');
stringContainer.add('world');

const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);

// 5. 泛型工具函数
function createApiResponse<T>(data: T, status: number = 200, message: string = 'Success'): ApiResponse<T> {
  return {
    data,
    status,
    message,
    success: status >= 200 && status < 300
  };
}

createApiResponse<User>({
  id: '1',
  name: '李四',
  email: 'lisi@example.com',
  profile: {
    age: 30,
    avatar: 'avatar.jpg'
  }
});

// 6. 条件类型使用
type NonNullable<T> = T extends null | undefined ? never : T;
void (null as NonNullable<string> | null);
type Flatten<T> = T extends (infer U)[] ? U : T;

type StringArray = string[];
type FlattenedString = Flatten<StringArray>; // string
void (null as FlattenedString | null);

// 7. 映射类型使用
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type UserPartial = Partial<User>;
type UserRequired = Required<User>;
void (null as UserPartial | null);
void (null as UserRequired | null);

// 8. 模板字面量类型
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
void (null as ClickEvent | ChangeEvent | null);

// 9. 递归类型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepReadonlyUser = DeepReadonly<User>;
void (null as DeepReadonlyUser | null);

// 10. 泛型约束与条件类型结合
function processValue<T>(value: T): T extends string ? string : T extends number ? number : unknown {
  if (typeof value === 'string') {
    return value.toUpperCase() as any;
  } else if (typeof value === 'number') {
    return (value * 2) as any;
  }
  return value as any;
}

// 11. 泛型与异步
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return createApiResponse<T>(data as unknown as T, response.status);
  } catch (error) {
    return createApiResponse<T>(null as any, 500, 'Internal Server Error');
  }
}

// 12. 泛型与装饰器
function logMethod<T extends (...args: any[]) => any>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
  void target;
  const originalMethod = descriptor.value!;
  
  descriptor.value = function(this: any, ...args: any[]) {
    console.log(`调用方法 ${propertyKey}，参数:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`方法 ${propertyKey} 返回:`, result);
    return result;
  } as T;
  return descriptor;
}

class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }

  @logMethod
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// 13. 泛型与工厂模式
interface Factory<T> {
  create(): T;
}

class UserFactory implements Factory<User> {
  create(): User {
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: '新用户',
      email: 'newuser@example.com',
      profile: {
        age: 0,
        avatar: 'default.jpg'
      }
    };
  }
}

// 14. 泛型与单例模式
class Singleton<T> {
  private static instance: Singleton<any>;
  private data: T;

  private constructor(data: T) {
    this.data = data;
  }

  static getInstance<T>(data: T): Singleton<T> {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(data);
    }
    return Singleton.instance as Singleton<T>;
  }

  getData(): T {
    return this.data;
  }
}

export {
  identity,
  getProperty,
  UserRepository,
  Container,
  createApiResponse,
  processValue,
  fetchData,
  Calculator,
  UserFactory,
  Singleton
};
