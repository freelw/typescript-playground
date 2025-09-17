// 基础类型使用示例
import { BasicTypes, StringOrNumber, PersonEmployee, Theme, User, CreateUser, UpdateUser } from '../types/basic';

// 1. 基本类型使用
const basicExample: BasicTypes = {
  name: '张三',
  age: 25,
  isActive: true,
  hobbies: ['编程', '阅读', '运动'],
  coordinates: [120.123, 30.456],
  status: 'approved',
  email: 'zhangsan@example.com',
  id: 'user-001',
  metadata: { lastLogin: new Date() },
  userInput: '用户输入的内容',
  empty: null,
  optional: undefined,
  callback: (value: string) => console.log(value),
  address: {
    street: '中山路123号',
    city: '上海',
    country: '中国'
  }
};

// 2. 联合类型使用
function processValue(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}

console.log(processValue('hello')); // HELLO
console.log(processValue(42)); // 42

// 3. 交叉类型使用
const personEmployee: PersonEmployee = {
  name: '李四',
  age: 30,
  id: 'emp-001',
  department: '技术部'
};

// 4. 字面量类型使用
function setTheme(theme: Theme): void {
  console.log(`设置主题为: ${theme}`);
}

setTheme('dark'); // 正确
// setTheme('blue'); // 错误：Type '"blue"' is not assignable to type 'Theme'

// 5. 类型守卫
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processUnknownValue(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase(); // 这里TypeScript知道value是string类型
  }
  return 'unknown';
}

// 6. 类型断言
const userInput = '{"name": "王五", "age": 28}';
// 仅演示断言，这里不使用 userData 避免未使用变量错误
JSON.parse(userInput) as User;

// 7. 可选链和空值合并
interface UserProfile {
  name: string;
  email?: string;
  address?: {
    city?: string;
  };
}

function getUserCity(profile: UserProfile): string {
  return profile.address?.city ?? '未知城市';
}

// 8. 工具类型使用
const newUser: CreateUser = {
  name: '赵六',
  email: 'zhaoliu@example.com',
  age: 32,
  isActive: true
};

const userUpdate: UpdateUser = {
  name: '赵六六' // 只更新name字段
};

// 9. 函数重载
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: boolean): string;
function formatValue(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return `字符串: ${value}`;
  } else if (typeof value === 'number') {
    return `数字: ${value}`;
  } else {
    return `布尔值: ${value}`;
  }
}

console.log(formatValue('hello')); // 字符串: hello
console.log(formatValue(42)); // 数字: 42
console.log(formatValue(true)); // 布尔值: true

// 10. 类型推断
const numbers = [1, 2, 3, 4, 5]; // TypeScript推断为number[]
const mixed = [1, 'hello', true]; // TypeScript推断为(number | string | boolean)[]

// 11. const断言
const colors = ['red', 'green', 'blue'] as const; // 推断为readonly ['red', 'green', 'blue']
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'

// 12. 模板字面量类型
type EventName<T extends string> = `on${Capitalize<T>}`;
// 使用类型以避免未使用告警
type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
void (null as ClickEvent | ChangeEvent | null);

export {
  basicExample,
  processValue,
  personEmployee,
  setTheme,
  processUnknownValue,
  getUserCity,
  newUser,
  userUpdate,
  formatValue,
  numbers,
  mixed,
  colors,
  Color
};
