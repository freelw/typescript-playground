// 接口使用示例
import { Animal, Flyable, Swimmable } from '../types/advanced';

// 1. 基础接口实现
class Dog implements Animal {
  constructor(public name: string, public age: number) {}

  makeSound(): string {
    return '汪汪！';
  }
}

class Bird implements Animal, Flyable {
  constructor(public name: string, public age: number) {}

  makeSound(): string {
    return '叽叽喳喳！';
  }

  fly(): void {
    console.log(`${this.name} 正在飞翔`);
  }
}

class Duck implements Animal, Flyable, Swimmable {
  constructor(public name: string, public age: number) {}

  makeSound(): string {
    return '嘎嘎！';
  }

  fly(): void {
    console.log(`${this.name} 正在飞翔`);
  }

  swim(): void {
    console.log(`${this.name} 正在游泳`);
  }
}

// 2. 接口继承
interface Mammal extends Animal {
  giveBirth(): void;
}

class Cat implements Mammal {
  constructor(public name: string, public age: number) {}

  makeSound(): string {
    return '喵喵！';
  }

  giveBirth(): void {
    console.log(`${this.name} 生了一只小猫`);
  }
}

// 3. 接口合并
interface User {
  name: string;
  email: string;
}

interface User {
  age: number;
  phone?: string;
}

// 现在User接口包含name, email, age和phone属性
const user: User = {
  name: '张三',
  email: 'zhangsan@example.com',
  age: 25,
  phone: '13800138000'
};

// 4. 函数接口
interface Calculator {
  (a: number, b: number): number;
}

const add: Calculator = (a, b) => a + b;
const multiply: Calculator = (a, b) => a * b;

// 5. 可索引接口
interface StringArray {
  [index: number]: string;
}

interface NumberDictionary {
  [key: string]: number;
}

const stringArray: StringArray = ['hello', 'world', 'typescript'];
const numberDict: NumberDictionary = {
  'one': 1,
  'two': 2,
  'three': 3
};

// 6. 构造函数接口
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {
    console.log(`创建数字时钟: ${h}:${m}`);
  }

  tick(): void {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {
    console.log(`创建模拟时钟: ${h}:${m}`);
  }

  tick(): void {
    console.log('tick tock');
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

// 7. 混合类型接口
interface Counter {
  (): number;
  increment(): void;
  decrement(): void;
  value: number;
}

function createCounter(): Counter {
  let count = 0;
  
  const counter = (() => count) as Counter;
  
  counter.increment = () => {
    count++;
  };
  
  counter.decrement = () => {
    count--;
  };
  
  Object.defineProperty(counter, 'value', {
    get: () => count
  });
  
  return counter;
}

// 8. 泛型接口
interface Cache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  clear(): void;
  size(): number;
}

class MemoryCache<T> implements Cache<T> {
  private cache = new Map<string, T>();

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// 9. 接口与类型别名的区别
// 接口可以合并，类型别名不能
// 接口合并示例（注释，以避免未使用告警）
// interface Point {
//   x: number;
//   y: number;
// }
// interface Point {
//   z?: number;
// }

// 类型别名可以用于联合类型，接口不能
type Status = 'loading' | 'success' | 'error';
void (null as Status | null);

// 10. 接口扩展与实现
interface Drawable {
  draw(): void;
}

interface Resizable {
  resize(width: number, height: number): void;
}

interface Shape extends Drawable, Resizable {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  draw(): void {
    console.log(`绘制矩形: ${this.width} x ${this.height}`);
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

// 11. 接口与抽象类
abstract class Vehicle {
  abstract start(): void;
  abstract stop(): void;
  
  protected isRunning: boolean = false;
  
  getStatus(): string {
    return this.isRunning ? '运行中' : '已停止';
  }
}

interface Electric {
  charge(): void;
  getBatteryLevel(): number;
}

class ElectricCar extends Vehicle implements Electric {
  private batteryLevel: number = 100;

  start(): void {
    if (this.batteryLevel > 0) {
      this.isRunning = true;
      console.log('电动车启动');
    } else {
      console.log('电池电量不足，无法启动');
    }
  }

  stop(): void {
    this.isRunning = false;
    console.log('电动车停止');
  }

  charge(): void {
    this.batteryLevel = 100;
    console.log('电动车充电完成');
  }

  getBatteryLevel(): number {
    return this.batteryLevel;
  }
}

// 12. 接口与装饰器
interface Loggable {
  log(message: string): void;
}

function loggable<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor implements Loggable {
    log(message: string): void {
      console.log(`[${new Date().toISOString()}] ${message}`);
    }
  };
}

@loggable
class Service {
  constructor(public name: string) {}
}

export {
  Dog,
  Bird,
  Duck,
  Cat,
  user,
  add,
  multiply,
  stringArray,
  numberDict,
  createClock,
  DigitalClock,
  AnalogClock,
  createCounter,
  MemoryCache,
  Rectangle,
  ElectricCar,
  Service
};
