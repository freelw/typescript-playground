// TypeScript学习demo主入口文件
import './examples/basic-types';
import './examples/generics';
import './examples/interfaces';
import './examples/classes';
import './examples/async';

// 主程序入口
async function main(): Promise<void> {
  console.log('🚀 TypeScript学习demo启动！');
  console.log('=====================================');
  
  // 基础类型示例
  console.log('\n📚 基础类型示例:');
  console.log('=====================================');
  
  // 泛型示例
  console.log('\n🔧 泛型示例:');
  console.log('=====================================');
  
  // 接口示例
  console.log('\n📋 接口示例:');
  console.log('=====================================');
  
  // 类示例
  console.log('\n🏗️ 类示例:');
  console.log('=====================================');
  
  // 异步示例
  console.log('\n⚡ 异步编程示例:');
  console.log('=====================================');
  
  console.log('\n✅ 所有示例运行完成！');
  console.log('💡 查看各个示例文件了解详细用法');
}

// 运行主程序
if (require.main === module) {
  main().catch(console.error);
}

export { main };
