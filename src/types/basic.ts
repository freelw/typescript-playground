// 基础类型定义示例

// 1. 基本类型
export type BasicTypes = {
  // 字符串类型
  name: string;
  // 数字类型
  age: number;
  // 布尔类型
  isActive: boolean;
  // 数组类型
  hobbies: string[];
  // 元组类型
  coordinates: [number, number];
  // 枚举类型
  status: 'pending' | 'approved' | 'rejected';
  // 可选属性
  email?: string;
  // 只读属性
  readonly id: string;
  // 任意类型（不推荐，但有时需要）
  metadata: any;
  // 未知类型（比any更安全）
  userInput: unknown;
  // 空类型
  empty: null;
  // 未定义类型
  optional: undefined;
  // 函数类型
  callback: (value: string) => void;
  // 对象类型
  address: {
    street: string;
    city: string;
    country: string;
  };
};

// 2. 联合类型
export type StringOrNumber = string | number;

// 3. 交叉类型
export type Person = {
  name: string;
  age: number;
};

export type Employee = {
  id: string;
  department: string;
};

export type PersonEmployee = Person & Employee;

// 4. 字面量类型
export type Theme = 'light' | 'dark';
export type Size = 'small' | 'medium' | 'large';

// 5. 类型别名
export type UserId = string;
export type Timestamp = number;

// 6. 索引签名
export type StringDictionary = {
  [key: string]: string;
};

export type NumberDictionary = {
  [key: string]: number;
};

// 7. 映射类型
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// 8. 条件类型
export type NonNullable<T> = T extends null | undefined ? never : T;

// 9. 工具类型示例
export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

export type CreateUser = Omit<User, 'id'>; // 排除id字段
export type UpdateUser = Partial<Pick<User, 'name' | 'email'>>; // 只选择部分字段并设为可选
export type UserSummary = Pick<User, 'id' | 'name' | 'email'>; // 只选择特定字段
