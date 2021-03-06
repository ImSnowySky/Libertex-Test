import React from 'react';
import FormContext, { defaultContextValue } from './context';
import { FormT, LimitCurrency, LimitNames } from './types';

const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formRef, setFormRef] = React.useState<HTMLDivElement | null>(null);
  const [sumInv, setSumInv] = React.useState<number>(defaultContextValue.sumInv);
  const [mult, setMult] = React.useState<number>(defaultContextValue.mult);
  const [limitType, setLimitType] = React.useState<LimitCurrency>(defaultContextValue.limitType);
  const [isTakeProfitActive, setIsTakeProfitActive] = React.useState<boolean>(defaultContextValue.takeProfit.active);
  const [takeProfitPercent, setTakeProfitPercent] = React.useState<number>(defaultContextValue.takeProfit.percent);
  const [takeProfitValue, setTakeProfitValue] = React.useState<number>(defaultContextValue.takeProfit.value);
  const [isStopLossActive, setIsStopLossActive] = React.useState<boolean>(defaultContextValue.stopLoss.active);
  const [stopLossValue, setStopLossValue] = React.useState<number>(defaultContextValue.stopLoss.value);
  const [stopLossPercent, setStopLossPercent] = React.useState<number>(defaultContextValue.stopLoss.percent);

  React.useEffect(() => {
    switch(limitType) {
      case '%':
        const incomeLimit = Math.round(sumInv * (takeProfitPercent / 100));
        const lossLimit = Math.round(sumInv * (stopLossPercent / 100));
        setTakeProfitValue(incomeLimit);
        setStopLossValue(lossLimit);
        break;
      case '$':
      default:
        const incomePercent = parseFloat((takeProfitValue / sumInv).toFixed(2));
        const lossPercent = parseFloat((stopLossValue / sumInv).toFixed(2));
        setTakeProfitPercent(incomePercent * 100);
        setStopLossPercent(lossPercent * 100);
        break;
    }
  }, [sumInv, limitType, takeProfitValue, takeProfitPercent, stopLossValue, stopLossPercent]);

  const setLimit = React.useCallback((limitType: LimitNames) => {
    const setPercent = limitType === 'takeProfit' ? setTakeProfitPercent : setStopLossPercent;
    const setValue = limitType === 'takeProfit' ? setTakeProfitValue : setStopLossValue;
    const value = limitType === 'takeProfit' ? takeProfitValue : stopLossValue;

    return (t: LimitCurrency, v: number) => {
      switch (t) {
        case '%':
          setPercent(v);
          setValue(sumInv * (v / 100));
          break;
        case '$':
        default:
          setPercent((value / sumInv) * 100);
          setValue(v); 
          break;
      }
    }
  }, [sumInv, takeProfitValue, stopLossValue]);

  const value: FormT = {
    formRef,
    setFormRef,
    sumInv,
    setSumInv,
    mult,
    setMult,
    limitType,
    setLimitType,
    takeProfit: {
      type: defaultContextValue.takeProfit.type,
      active: isTakeProfitActive,
      value: takeProfitValue,
      percent: takeProfitPercent,
      setActive: setIsTakeProfitActive,
      setValue: setLimit(defaultContextValue.takeProfit.type),
    },
    stopLoss: {
      type: defaultContextValue.stopLoss.type,
      active: isStopLossActive,
      value: stopLossValue,
      percent: stopLossPercent,
      setActive: setIsStopLossActive,
      setValue: setLimit(defaultContextValue.stopLoss.type),
    },
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider;