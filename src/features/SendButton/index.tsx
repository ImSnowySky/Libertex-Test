import Button from 'components/Button';
import React from 'react';
import * as Elements  from './elements';
import { ReactComponent as ArrowLongTop } from 'assets/arrow-long-bottom.svg';
import { FormContext } from 'contexts/Form';

export type Direction = 'growth' | 'reduction';

type SendButtonProps = {
  direction: Direction,
}

const BUTTON_NAME: Record<Direction, string> = {
  'growth': 'В рост',
  'reduction': 'В снижение',
}

const SendButton: React.FC<SendButtonProps> = ({ direction }) => {
  const { registerInvestment } = React.useContext(FormContext);

  const ArrowView = React.useMemo(() => {
    const transform = `rotate(${direction === 'growth'  ? '180deg' : 0})`;
    const style = { transform };

    return <ArrowLongTop width={10} height={11} style={style} />
  }, [direction]);

  return React.useMemo(() => (
    <Elements.ButtonWrapper direction={direction}>
      <Button pre={ArrowView} onClick={() => registerInvestment(direction)}>
        {BUTTON_NAME[direction]}
      </Button>
    </Elements.ButtonWrapper>
  ), [direction, ArrowView, registerInvestment]);
}

export default SendButton;