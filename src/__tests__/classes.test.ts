// 类测试示例
import { Person, Student, BankAccount, MathUtils, Stack } from '../examples/classes';

describe('类测试', () => {
  describe('Person', () => {
    it('应该正确创建Person实例', () => {
      const person = new Person('张三', 25, 'zhangsan@example.com');
      expect(person.name).toBe('张三');
      expect(person.introduce()).toBe('你好，我是张三，今年25岁');
    });

    it('应该创建匿名用户', () => {
      const anonymous = Person.createAnonymous();
      expect(anonymous.name).toBe('匿名用户');
      expect(anonymous.age).toBe(0);
    });
  });

  describe('Student', () => {
    it('应该正确创建Student实例', () => {
      const student = new Student('李四', 20, 'lisi@example.com', 'S001');
      expect(student.name).toBe('李四');
      expect(student.introduce()).toContain('学号是S001');
    });

    it('应该能够注册课程', () => {
      const student = new Student('王五', 22, 'wangwu@example.com', 'S002');
      student.enrollCourse('数学');
      student.enrollCourse('物理');
      expect(student.getCourses()).toEqual(['数学', '物理']);
    });
  });

  describe('BankAccount', () => {
    let account: BankAccount;

    beforeEach(() => {
      account = new BankAccount('ACC001');
    });

    it('应该正确创建账户', () => {
      expect(account.balance).toBe(0);
      expect(account.accountNumber).toBe('ACC001');
    });

    it('应该能够存款', () => {
      account.deposit(100);
      expect(account.balance).toBe(100);
    });

    it('应该能够取款', () => {
      account.deposit(100);
      account.withdraw(30);
      expect(account.balance).toBe(70);
    });

    it('应该拒绝负数余额', () => {
      expect(() => {
        account.balance = -10;
      }).toThrow('余额不能为负数');
    });

    it('应该拒绝取款超过余额', () => {
      account.deposit(50);
      expect(() => {
        account.withdraw(100);
      }).toThrow('余额不足');
    });
  });

  describe('MathUtils', () => {
    it('应该正确计算加法', () => {
      expect(MathUtils.add(2, 3)).toBe(5);
    });

    it('应该正确计算乘法', () => {
      expect(MathUtils.multiply(4, 5)).toBe(20);
    });

    it('应该正确计算圆面积', () => {
      expect(MathUtils.circleArea(5)).toBeCloseTo(78.54, 2);
    });

    it('应该正确计算阶乘', () => {
      expect(MathUtils.factorial(5)).toBe(120);
    });
  });

  describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('应该正确创建空栈', () => {
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });

    it('应该能够入栈和出栈', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      expect(stack.size()).toBe(3);
      expect(stack.peek()).toBe(3);
      
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      
      expect(stack.isEmpty()).toBe(true);
    });

    it('应该能够清空栈', () => {
      stack.push(1);
      stack.push(2);
      stack.clear();
      
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });
  });
});
