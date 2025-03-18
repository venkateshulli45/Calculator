import { useState } from 'react';
import styles from './Calculator.module.css';

type Operation = '+' | '-' | '×' | '÷' | null;

export function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState<Operation>(null);
  const [shouldResetScreen, setShouldResetScreen] = useState(false);
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  const appendNumber = (number: string) => {
    if (currentValue === '0' || shouldResetScreen) {
      setCurrentValue(number);
      setShouldResetScreen(false);
    } else {
      setCurrentValue(`${currentValue}${number}`);
    }
    setInputHistory([...inputHistory, number]);
  };

  const chooseOperation = (op: Operation) => {
    if (currentValue === '') return;
    if (previousValue !== '') {
      calculate();
    }
    setOperation(op);
    setPreviousValue(currentValue);
    setShouldResetScreen(true);
    setInputHistory([]);
  };

  const calculate = () => {
    if (!operation || !previousValue || !currentValue) return;

    let computation = 0;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    setCurrentValue(computation.toString());
    setOperation(null);
    setPreviousValue('');
    setInputHistory([]);
  };

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue('');
    setOperation(null);
    setInputHistory([]);
  };

  const deleteNumber = () => {
    setCurrentValue(currentValue.slice(0, -1) || '0');
  };

  const addDecimal = () => {
    if (shouldResetScreen) {
      setCurrentValue('0.');
      setShouldResetScreen(false);
      return;
    }
    if (currentValue.includes('.')) return;
    setCurrentValue(`${currentValue}.`);
    setInputHistory([...inputHistory, '.']);
  };

  const removeRecentInput = () => {
    if (inputHistory.length === 0) return;
    
    const newHistory = [...inputHistory];
    newHistory.pop();
    setInputHistory(newHistory);
    
    if (newHistory.length === 0) {
      setCurrentValue('0');
    } else {
      setCurrentValue(newHistory.join(''));
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles.previousValue}>
          {previousValue} {operation}
        </div>
        <div className={styles.currentValue}>{currentValue}</div>
      </div>

      <div className={styles.grid}>
        <button className={`${styles.button} ${styles.clearButton}`} onClick={clear}>
          AC
        </button>
        <button className={styles.button} onClick={deleteNumber}>
          DEL
        </button>
        <button className={`${styles.button} ${styles.undoButton}`} onClick={removeRecentInput}>
          ↩
        </button>
        <button
          className={`${styles.button} ${styles.operatorButton}`}
          onClick={() => chooseOperation('÷')}
        >
          ÷
        </button>

        <button className={styles.button} onClick={() => appendNumber('7')}>
          7
        </button>
        <button className={styles.button} onClick={() => appendNumber('8')}>
          8
        </button>
        <button className={styles.button} onClick={() => appendNumber('9')}>
          9
        </button>
        <button
          className={`${styles.button} ${styles.operatorButton}`}
          onClick={() => chooseOperation('×')}
        >
          ×
        </button>

        <button className={styles.button} onClick={() => appendNumber('4')}>
          4
        </button>
        <button className={styles.button} onClick={() => appendNumber('5')}>
          5
        </button>
        <button className={styles.button} onClick={() => appendNumber('6')}>
          6
        </button>
        <button
          className={`${styles.button} ${styles.operatorButton}`}
          onClick={() => chooseOperation('-')}
        >
          -
        </button>

        <button className={styles.button} onClick={() => appendNumber('1')}>
          1
        </button>
        <button className={styles.button} onClick={() => appendNumber('2')}>
          2
        </button>
        <button className={styles.button} onClick={() => appendNumber('3')}>
          3
        </button>
        <button
          className={`${styles.button} ${styles.operatorButton}`}
          onClick={() => chooseOperation('+')}
        >
          +
        </button>

        <button className={styles.button} onClick={() => appendNumber('0')}>
          0
        </button>
        <button className={styles.button} onClick={addDecimal}>
          .
        </button>
        <button
          className={`${styles.button} ${styles.equalButton}`}
          onClick={calculate}
        >
          =
        </button>
      </div>
    </div>
  );
}