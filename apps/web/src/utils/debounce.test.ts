import { describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce'; // import debounce from your file

describe('debounce', () => {
  it('should call the original function after the delay', async () => {
    const originalFunction = vi.fn();
    const debouncedFunction = debounce(originalFunction, 100);
    debouncedFunction();
    expect(originalFunction).not.toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(originalFunction).toHaveBeenCalledTimes(1);
  });

  it('should debounce multiple calls', async () => {
    const originalFunction = vi.fn();
    const debouncedFunction = debounce(originalFunction, 100);
    debouncedFunction();
    debouncedFunction();
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(originalFunction).toHaveBeenCalledTimes(1);
  });

  it('should reset the timeout on subsequent calls', async () => {
    const originalFunction = vi.fn();
    const debouncedFunction = debounce(originalFunction, 100);
    debouncedFunction();
    await new Promise((resolve) => setTimeout(resolve, 50));
    debouncedFunction();
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(originalFunction).toHaveBeenCalledTimes(1);
  });
});
