/**
 * 控制台日志工具类
 * 提供带颜色的控制台输出功能
 */
export class ConsoleLogger {
  /**
   * 成功信息输出（绿色）
   */
  static success(message: string, ...args: any[]) {
    console.log(`%c✓ ${message}`, 'color: #67c23a; font-weight: bold;', ...args);
  }
  
  /**
   * 错误信息输出（红色）
   */
  static error(message: string, ...args: any[]) {
    console.log(`%c✗ ${message}`, 'color: #f56c6c; font-weight: bold;', ...args);
  }
  
  /**
   * 警告信息输出（橙色）
   */
  static warn(message: string, ...args: any[]) {
    console.log(`%c⚠ ${message}`, 'color: #e6a23c; font-weight: bold;', ...args);
  }
  
  /**
   * 信息输出（蓝色）
   */
  static info(message: string, ...args: any[]) {
    console.log(`%cℹ ${message}`, 'color: #409eff; font-weight: bold;', ...args);
  }
  
  /**
   * 调试信息输出（灰色）
   */
  static debug(message: string, ...args: any[]) {
    console.log(`%c🔍 ${message}`, 'color: #909399; font-weight: normal;', ...args);
  }
  
  /**
   * 分组日志输出
   */
  static group(label: string, collapsed = false) {
    if (collapsed) {
      console.groupCollapsed(`%c📁 ${label}`, 'color: #606266; font-weight: bold;');
    } else {
      console.group(`%c📁 ${label}`, 'color: #606266; font-weight: bold;');
    }
  }
  
  /**
   * 结束分组
   */
  static groupEnd() {
    console.groupEnd();
  }
  
  /**
   * 表格输出
   */
  static table(data: any, columns?: string[]) {
    console.log('%c📊 表格数据:', 'color: #409eff; font-weight: bold;');
    if (columns) {
      console.table(data, columns);
    } else {
      console.table(data);
    }
  }
  
  /**
   * 时间戳日志
   */
  static time(label: string) {
    console.time(`⏱️ ${label}`);
    console.log(`%c开始计时: ${label}`, 'color: #e6a23c; font-weight: bold;');
  }
  
  /**
   * 结束时间戳
   */
  static timeEnd(label: string) {
    console.timeEnd(`⏱️ ${label}`);
    console.log(`%c结束计时: ${label}`, 'color: #e6a23c; font-weight: bold;');
  }
}

/**
 * 简化的日志函数
 */
export const logger = {
  success: ConsoleLogger.success,
  error: ConsoleLogger.error,
  warn: ConsoleLogger.warn,
  info: ConsoleLogger.info,
  debug: ConsoleLogger.debug,
  group: ConsoleLogger.group,
  groupEnd: ConsoleLogger.groupEnd,
  table: ConsoleLogger.table,
  time: ConsoleLogger.time,
  timeEnd: ConsoleLogger.timeEnd
};