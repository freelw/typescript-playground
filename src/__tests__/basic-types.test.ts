// 基础类型测试示例
import { processValue, formatValue, getUserCity } from '../examples/basic-types';

describe('基础类型测试', () => {
  describe('processValue', () => {
    it('应该正确处理字符串输入', () => {
      expect(processValue('hello')).toBe('HELLO');
    });

    it('应该正确处理数字输入', () => {
      expect(processValue(42)).toBe('42');
    });
  });

  describe('formatValue', () => {
    it('应该格式化字符串', () => {
      expect(formatValue('hello')).toBe('字符串: hello');
    });

    it('应该格式化数字', () => {
      expect(formatValue(42)).toBe('数字: 42');
    });

    it('应该格式化布尔值', () => {
      expect(formatValue(true)).toBe('布尔值: true');
    });
  });

  describe('getUserCity', () => {
    it('应该返回用户城市', () => {
      const profile = {
        name: '张三',
        address: {
          city: '上海'
        }
      };
      expect(getUserCity(profile)).toBe('上海');
    });

    it('应该返回默认值当城市不存在时', () => {
      const profile = {
        name: '李四'
      };
      expect(getUserCity(profile)).toBe('未知城市');
    });
  });
});
