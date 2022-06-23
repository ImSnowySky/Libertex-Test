import React from 'react';
import * as Elements  from './elements';
import Input, { InputFormat } from 'components/Input';
import { ReactComponent as MultipleIcon } from 'assets/multiple.svg';
import WithLabel from 'components/WithLabel';
import { FormContext, FormController } from 'contexts/Form';

const Multiplicator: React.FC = () => {
  const { sumInv, mult, setMult } = React.useContext(FormContext);

  const onChangeHandler = React.useCallback((v: string) => {
    setMult(parseInt(v, 10) || 0);
  }, [setMult]);

  const errorView = React.useMemo(() => {
    if (!!FormController.multValidate(mult)) return null;
    return 'Неверное значение мультипликатора'
  }, [mult]);

  return React.useMemo(() => (
    <WithLabel label='Мультипликатор'>
      <Elements.InputWrapper>
        <Input
          pre={<MultipleIcon width={6} height={6} />}
          value={mult}
          format={InputFormat.number({ maxValue: 99 })}
          onChange={onChangeHandler}
          error={errorView}
        />
      </Elements.InputWrapper>
      <Elements.FinalSum>
        = ${InputFormat.number().to(sumInv * mult)}
      </Elements.FinalSum>
    </WithLabel>
  ), [sumInv, mult, onChangeHandler, errorView])
}

export default Multiplicator;