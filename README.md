# TypeScript 学习 Demo 工程

这是一个全面的 TypeScript 学习示例项目，包含了从基础到高级的各种 TypeScript 特性和用法。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 编译项目

```bash
npm run build
```

### 运行项目

```bash
npm start
```

### 开发模式（监听文件变化）

```bash
npm run dev
```

### 运行测试

```bash
npm test
```

## 📚 学习内容

### 1. 基础类型和语法 (`src/examples/basic-types.ts`)

- **基本类型**: string, number, boolean, array, tuple
- **联合类型**: `string | number`
- **交叉类型**: `Person & Employee`
- **字面量类型**: `'light' | 'dark'`
- **类型别名**: `type UserId = string`
- **索引签名**: `[key: string]: string`
- **映射类型**: `Partial<T>`, `Required<T>`
- **条件类型**: `T extends U ? X : Y`
- **工具类型**: `Pick<T, K>`, `Omit<T, K>`
- **类型守卫**: `value is string`
- **类型断言**: `value as string`
- **可选链**: `obj?.prop`
- **空值合并**: `value ?? defaultValue`
- **函数重载**: 同名函数不同参数类型

### 2. 泛型 (`src/examples/generics.ts`)

- **泛型函数**: `function identity<T>(arg: T): T`
- **泛型接口**: `interface Repository<T>`
- **泛型类**: `class Container<T>`
- **泛型约束**: `T extends HasId`
- **条件类型**: `T extends U ? X : Y`
- **映射类型**: `[P in keyof T]`
- **模板字面量类型**: `` `on${Capitalize<T>}` ``
- **递归类型**: `DeepReadonly<T>`
- **泛型与装饰器**: 方法装饰器示例
- **泛型与工厂模式**: 泛型工厂类
- **泛型与单例模式**: 泛型单例类

### 3. 接口 (`src/examples/interfaces.ts`)

- **基础接口**: `interface Animal`
- **接口继承**: `interface Mammal extends Animal`
- **接口合并**: 同名接口自动合并
- **函数接口**: `interface Calculator`
- **可索引接口**: `[index: number]: string`
- **构造函数接口**: `new (args) => Instance`
- **混合类型接口**: 函数 + 对象属性
- **泛型接口**: `interface Repository<T>`
- **接口与抽象类**: 接口实现抽象类
- **接口与装饰器**: 装饰器实现接口

### 4. 类 (`src/examples/classes.ts`)

- **基础类**: 公共、私有、受保护成员
- **继承**: `class Student extends Person`
- **抽象类**: `abstract class Shape`
- **接口实现**: `class Duck implements Flyable, Swimmable`
- **访问器**: `get` 和 `set` 方法
- **静态成员**: 静态属性和方法
- **泛型类**: `class Stack<T>`
- **设计模式**: 单例、工厂、观察者模式
- **方法重写**: `override` 关键字
- **构造函数**: 参数属性

### 5. 异步编程 (`src/examples/async.ts`)

- **Promise**: 基础 Promise 使用
- **async/await**: 异步函数语法
- **错误处理**: try-catch 与 Promise
- **并行执行**: `Promise.all()`
- **竞态条件**: `Promise.race()`
- **重试机制**: 指数退避重试
- **异步生成器**: `async function*`
- **异步队列**: 顺序处理异步任务
- **异步缓存**: 缓存异步结果
- **异步锁**: 防止并发访问
- **异步批处理**: 批量处理异步任务
- **异步工具函数**: map, filter, reduce
- **异步事件发射器**: 异步事件处理

## 🛠️ 项目结构

```
typescript-playground/
├── src/
│   ├── examples/           # 示例代码
│   │   ├── basic-types.ts  # 基础类型示例
│   │   ├── generics.ts     # 泛型示例
│   │   ├── interfaces.ts   # 接口示例
│   │   ├── classes.ts      # 类示例
│   │   └── async.ts        # 异步编程示例
│   ├── types/              # 类型定义
│   │   ├── basic.ts        # 基础类型定义
│   │   └── advanced.ts     # 高级类型定义
│   ├── utils/              # 工具函数
│   ├── __tests__/          # 测试文件
│   │   ├── basic-types.test.ts
│   │   └── classes.test.ts
│   └── index.ts            # 主入口文件
├── dist/                   # 编译输出目录
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── jest.config.js          # Jest 测试配置
└── README.md               # 项目说明
```

## 🔧 配置说明

### TypeScript 配置 (`tsconfig.json`)

- **target**: ES2020 - 编译目标版本
- **module**: commonjs - 模块系统
- **strict**: true - 启用严格模式
- **noImplicitAny**: true - 禁止隐式 any
- **noImplicitReturns**: true - 禁止隐式返回
- **exactOptionalPropertyTypes**: true - 精确可选属性类型

### 测试配置 (`jest.config.js`)

- **preset**: ts-jest - TypeScript 预设
- **testEnvironment**: node - Node.js 环境
- **coverage**: 代码覆盖率报告

## 📖 学习建议

### 初学者路径

1. **基础类型** → 了解 TypeScript 的基本类型系统
2. **接口** → 学习如何定义和使用接口
3. **类** → 掌握面向对象编程
4. **泛型** → 学习类型参数化
5. **异步编程** → 掌握现代异步编程模式

### 进阶路径

1. **高级类型** → 条件类型、映射类型、模板字面量类型
2. **设计模式** → 在 TypeScript 中实现各种设计模式
3. **装饰器** → 元编程和装饰器模式
4. **模块系统** → ES 模块和 CommonJS
5. **工具类型** → 自定义工具类型

## 🧪 运行示例

### 基础类型示例

```typescript
import { processValue, formatValue } from './src/examples/basic-types';

console.log(processValue('hello')); // HELLO
console.log(formatValue(42)); // 数字: 42
```

### 泛型示例

```typescript
import { identity, Container } from './src/examples/generics';

const result = identity<string>('hello');
const container = new Container<number>();
container.add(1);
```

### 类示例

```typescript
import { Person, Student } from './src/examples/classes';

const person = new Person('张三', 25, 'zhangsan@example.com');
const student = new Student('李四', 20, 'lisi@example.com', 'S001');
```

### 异步示例

```typescript
import { basicAsync, fetchUserData } from './src/examples/async';

async function example() {
  const result = await basicAsync();
  const user = await fetchUserData('123');
}
```

## 🔍 调试技巧

### 1. 类型检查

```bash
npx tsc --noEmit  # 只检查类型，不生成文件
```

### 2. 严格模式

启用 `strict` 模式可以帮助发现更多潜在问题：

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 3. 类型断言

当 TypeScript 无法推断类型时，可以使用类型断言：

```typescript
const value = someValue as string;
// 或者
const value = <string>someValue;
```

### 4. 类型守卫

使用类型守卫来缩小类型范围：

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

## 📚 推荐资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 深入理解](https://jkchao.github.io/typescript-book-chinese/)
- [TypeScript 工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript 设计模式](https://github.com/torokmark/design_patterns_in_typescript)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习项目！

## 📄 许可证

MIT License