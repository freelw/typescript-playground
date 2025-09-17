// 类使用示例

// 1. 基础类定义
class Person {
  // 公共属性
  public name: string;
  // 私有属性
  private age: number;
  // 受保护属性
  protected email: string;
  // 只读属性
  public readonly id: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  // 公共方法
  public introduce(): string {
    return `你好，我是${this.name}，今年${this.age}岁`;
  }

  // 私有方法
  private validateEmail(): boolean {
    return this.email.includes('@');
  }

  // 受保护方法
  protected getEmail(): string {
    return this.validateEmail() ? this.email : '无效邮箱';
  }

  // 静态方法
  static createAnonymous(): Person {
    return new Person('匿名用户', 0, 'anonymous@example.com');
  }

  // 静态属性
  static species = 'Homo sapiens';
}

// 2. 继承
class Student extends Person {
  private studentId: string;
  private courses: string[] = [];

  constructor(name: string, age: number, email: string, studentId: string) {
    super(name, age, email); // 调用父类构造函数
    this.studentId = studentId;
  }

  // 重写父类方法
  public override introduce(): string {
    return `${super.introduce()}，我的学号是${this.studentId}`;
  }

  // 新增方法
  public enrollCourse(course: string): void {
    this.courses.push(course);
    console.log(`${this.name} 已注册课程: ${course}`);
  }

  public getCourses(): string[] {
    return [...this.courses];
  }

  // 访问父类受保护的方法
  public getEmailAddress(): string {
    return this.getEmail();
  }
}

// 3. 抽象类
abstract class Shape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  // 抽象方法，子类必须实现
  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;

  // 具体方法
  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  // 抽象方法可以有默认实现
  public describe(): string {
    return `这是一个${this.color}的图形`;
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number, color: string = '红色') {
    super(color);
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  public override describe(): string {
    return `${super.describe()}，半径: ${this.radius}`;
  }
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number, color: string = '蓝色') {
    super(color);
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }

  public override describe(): string {
    return `${super.describe()}，尺寸: ${this.width} x ${this.height}`;
  }
}

// 4. 接口实现
interface Flyable {
  fly(): void;
  altitude: number;
}

interface Swimmable {
  swim(): void;
  depth: number;
}

class Duck implements Flyable, Swimmable {
  public altitude: number = 0;
  public depth: number = 0;

  fly(): void {
    this.altitude = 100;
    console.log('鸭子飞起来了！');
  }

  swim(): void {
    this.depth = 5;
    console.log('鸭子在游泳！');
  }
}

// 5. 访问器（getter/setter）
class BankAccount {
  private _balance: number = 0;
  private _accountNumber: string;

  constructor(accountNumber: string) {
    this._accountNumber = accountNumber;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount < 0) {
      throw new Error('余额不能为负数');
    }
    this._balance = amount;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('存款金额必须大于0');
    }
    this._balance += amount;
    console.log(`存款成功，当前余额: ${this._balance}`);
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('取款金额必须大于0');
    }
    if (amount > this._balance) {
      throw new Error('余额不足');
    }
    this._balance -= amount;
    console.log(`取款成功，当前余额: ${this._balance}`);
  }
}

// 6. 静态成员
class MathUtils {
  static readonly PI = 3.14159;
  static readonly E = 2.71828;

  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }

  static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

// 7. 泛型类
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

// 8. 单例模式
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;

  private constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  public static getInstance(connectionString?: string): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      if (!connectionString) {
        throw new Error('首次创建实例时必须提供连接字符串');
      }
      DatabaseConnection.instance = new DatabaseConnection(connectionString);
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    console.log(`连接到数据库: ${this.connectionString}`);
  }

  public disconnect(): void {
    console.log('断开数据库连接');
  }
}

// 9. 工厂模式
interface Animal {
  makeSound(): string;
}

class Dog implements Animal {
  makeSound(): string {
    return '汪汪！';
  }
}

class Cat implements Animal {
  makeSound(): string {
    return '喵喵！';
  }
}

class AnimalFactory {
  static createAnimal(type: 'dog' | 'cat'): Animal {
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw new Error('不支持的动物类型');
    }
  }
}

// 10. 观察者模式
interface Observer {
  update(data: any): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data: any): void;
}

class NewsAgency implements Subject {
  private observers: Observer[] = [];
  private news: string = '';

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }

  setNews(news: string): void {
    this.news = news;
    this.notify(news);
  }

  getNews(): string {
    return this.news;
  }
}

class NewsSubscriber implements Observer {
  constructor(private name: string) {}

  update(data: any): void {
    console.log(`${this.name} 收到新闻: ${data}`);
  }
}

export {
  Person,
  Student,
  Shape,
  Circle,
  Rectangle,
  Duck,
  BankAccount,
  MathUtils,
  Stack,
  DatabaseConnection,
  AnimalFactory,
  Dog,
  Cat,
  NewsAgency,
  NewsSubscriber
};
