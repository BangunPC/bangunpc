import { type PropFunction, type Signal, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';

/**
 * Debounces a signal value and invokes a function after a specified delay.
 * https://www.fabiobiondi.dev/blog/2023-08/qwik-debounce-custom-hook
 *
 * @param {Signal} signal - The signal to be debounced.
 * @param {number} milliSeconds - The delay in milliseconds before invoking the function.
 * @param {PropFunction<(value: T) => void>} [fn] - The function to be invoked after the delay.
 * @return {Signal} - The debounced signal.
 */
export function useDebounce<T>(
  signal: Signal,
  milliSeconds: number,
  fn?: PropFunction<(value: T) => void>,
): Signal {
  // create the debounced Signal
  const debouncedSig = useSignal('');

  useVisibleTask$(({ track, cleanup }) => {
    // track the signal
    track(() => signal.value);

    // start timeout
    const debounced = setTimeout(async () => {
      // 1. invoke the function
      await fn?.(signal.value)
      // 2. update the debouncedSig signal
      debouncedSig.value = signal.value;
    }, milliSeconds);

    // clean setTimeout each time the tracked signal changes
    cleanup(() => clearTimeout(debounced));
  });

  // Return the debouncedSig
  return debouncedSig;
}