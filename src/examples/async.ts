// 异步编程示例

// 1. Promise基础使用
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function basicAsync(): Promise<string> {
  console.log('开始异步操作');
  await delay(1000);
  console.log('异步操作完成');
  return '操作结果';
}

// 2. 错误处理
async function fetchUserData(userId: string): Promise<{ id: string; name: string; email: string }> {
  try {
    // 模拟API调用
    await delay(500);
    
    if (userId === 'invalid') {
      throw new Error('用户ID无效');
    }
    
    return {
      id: userId,
      name: '张三',
      email: 'zhangsan@example.com'
    };
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}

// 3. 并行执行
async function fetchMultipleUsers(userIds: string[]): Promise<Array<{ id: string; name: string; email: string }>> {
  try {
    const promises = userIds.map(id => fetchUserData(id));
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error('批量获取用户数据失败:', error);
    throw error;
  }
}

// 4. 竞态条件处理
async function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('请求超时')), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// 5. 重试机制
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error as Error;
      console.log(`尝试 ${i + 1}/${maxRetries + 1} 失败:`, error);
      
      if (i < maxRetries) {
        await delay(delayMs * Math.pow(2, i)); // 指数退避
      }
    }
  }
  
  throw lastError!;
}

// 6. 异步生成器
async function* asyncGenerator(start: number, end: number): AsyncGenerator<number, void, unknown> {
  for (let i = start; i <= end; i++) {
    await delay(100); // 模拟异步操作
    yield i;
  }
}

async function consumeAsyncGenerator(): Promise<void> {
  console.log('开始异步生成器');
  for await (const value of asyncGenerator(1, 5)) {
    console.log('生成器值:', value);
  }
  console.log('异步生成器完成');
}

// 7. 异步队列
class AsyncQueue<T> {
  private queue: T[] = [];
  private processing = false;

  async enqueue(item: T): Promise<void> {
    this.queue.push(item);
    if (!this.processing) {
      await this.process();
    }
  }

  private async process(): Promise<void> {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const item = this.queue.shift()!;
      try {
        await this.processItem(item);
      } catch (error) {
        console.error('处理项目失败:', error);
      }
    }
    
    this.processing = false;
  }

  private async processItem(item: T): Promise<void> {
    // 模拟异步处理
    await delay(200);
    console.log('处理项目:', item);
  }
}

// 8. 异步缓存
class AsyncCache<T> {
  private cache = new Map<string, Promise<T>>();

  async get(key: string, factory: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const promise = factory();
    this.cache.set(key, promise);
    
    try {
      const result = await promise;
      return result;
    } catch (error) {
      this.cache.delete(key);
      throw error;
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

// 9. 异步锁
class AsyncLock {
  private locked = false;
  private waitingQueue: Array<() => void> = [];

  async acquire(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.locked) {
        this.locked = true;
        resolve();
      } else {
        this.waitingQueue.push(resolve);
      }
    });
  }

  release(): void {
    if (this.waitingQueue.length > 0) {
      const next = this.waitingQueue.shift()!;
      next();
    } else {
      this.locked = false;
    }
  }
}

// 10. 异步批处理
class AsyncBatchProcessor<T, R> {
  private batch: T[] = [];
  private batchSize: number;
  private processFn: (items: T[]) => Promise<R[]>;
  private timeout: number;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor(
    batchSize: number,
    processFn: (items: T[]) => Promise<R[]>,
    timeout: number = 1000
  ) {
    this.batchSize = batchSize;
    this.processFn = processFn;
    this.timeout = timeout;
  }

  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.batch.push({ item, resolve, reject } as any);
      
      if (this.batch.length >= this.batchSize) {
        this.processBatch();
      } else if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => this.processBatch(), this.timeout);
      }
    });
  }

  private async processBatch(): Promise<void> {
    if (this.batch.length === 0) return;

    const currentBatch = this.batch.splice(0, this.batchSize);
    this.clearTimeout();

    try {
      const items = currentBatch.map((item: any) => item.item);
      const results = await this.processFn(items);
      
      currentBatch.forEach((item: any, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      currentBatch.forEach((item: any) => {
        item.reject(error);
      });
    }
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}

// 11. 异步工具函数
class AsyncUtils {
  static async map<T, R>(
    items: readonly T[],
    mapper: (item: T, index: number) => Promise<R>,
    concurrency: number = 5
  ): Promise<R[]> {
    const results: R[] = [];
    const executing: Promise<void>[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i]!;
      const promise = mapper(item as T, i).then(result => {
        results[i] = result;
      });

      executing.push(promise);

      if (executing.length >= concurrency) {
        await Promise.race(executing);
        executing.splice(executing.findIndex(p => p === promise), 1);
      }
    }

    await Promise.all(executing);
    return results;
  }

  static async filter<T>(
    items: readonly T[],
    predicate: (item: T, index: number) => Promise<boolean>
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]! as T;
      if (await predicate(item, i)) {
        results.push(item);
      }
    }
    
    return results;
  }

  static async reduce<T, R>(
    items: readonly T[],
    reducer: (acc: R, item: T, index: number) => Promise<R>,
    initialValue: R
  ): Promise<R> {
    let result = initialValue;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]! as T;
      result = await reducer(result, item, i);
    }
    
    return result;
  }
}

// 12. 异步事件发射器
interface AsyncEventEmitter {
  on(event: string, listener: (...args: any[]) => Promise<void>): void;
  emit(event: string, ...args: any[]): Promise<void>;
  off(event: string, listener: (...args: any[]) => Promise<void>): void;
}

class AsyncEventEmitterImpl implements AsyncEventEmitter {
  private listeners = new Map<string, Array<(...args: any[]) => Promise<void>>>();

  on(event: string, listener: (...args: any[]) => Promise<void>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  async emit(event: string, ...args: any[]): Promise<void> {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    const promises = eventListeners.map(listener => listener(...args));
    await Promise.all(promises);
  }

  off(event: string, listener: (...args: any[]) => Promise<void>): void {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    const index = eventListeners.indexOf(listener);
    if (index > -1) {
      eventListeners.splice(index, 1);
    }
  }
}

export {
  basicAsync,
  fetchUserData,
  fetchMultipleUsers,
  fetchWithTimeout,
  fetchWithRetry,
  asyncGenerator,
  consumeAsyncGenerator,
  AsyncQueue,
  AsyncCache,
  AsyncLock,
  AsyncBatchProcessor,
  AsyncUtils,
  AsyncEventEmitterImpl
};
