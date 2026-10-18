// Motion figure: each step of the motion table, demonstrated by the component that owns it.
// Hydrated so the transitions can be tried; durations are the ones the components' CSS uses.
import { useState } from 'react';
import { Button, ProgressBar, Skeleton, Spinner, Switch } from 'tenet-ui';

const STEPS = [25, 60, 100];

export function MotionDemo() {
  const [step, setStep] = useState(0);
  return (
    <div className="tenet-motion">
      <div className="tenet-motion__tile">
        <div className="tenet-motion__stage">
          <Button>Hover or focus me</Button>
        </div>
        <p className="tenet-motion__name">Feedback</p>
        <p className="tenet-motion__spec">0.12s ease · colour, border, shadow</p>
      </div>
      <div className="tenet-motion__tile">
        <div className="tenet-motion__stage">
          <Switch label="Toggle me" />
        </div>
        <p className="tenet-motion__name">Movement</p>
        <p className="tenet-motion__spec">0.16s ease · something changes place</p>
      </div>
      <div className="tenet-motion__tile">
        <div className="tenet-motion__stage tenet-motion__stage--stack">
          <ProgressBar value={STEPS[step]} aria-label="Demo progress" />
          <Button size="small" onClick={() => setStep((s) => (s + 1) % STEPS.length)}>
            Advance
          </Button>
        </div>
        <p className="tenet-motion__name">Progress</p>
        <p className="tenet-motion__spec">0.3s ease · a determinate bar filling</p>
      </div>
      <div className="tenet-motion__tile">
        <div className="tenet-motion__stage tenet-motion__stage--stack">
          <Spinner size="small" label="Loading" />
          <Skeleton width="100%" height={10} />
        </div>
        <p className="tenet-motion__name">Loop</p>
        <p className="tenet-motion__spec">0.6s to 1.6s, infinite · work in progress</p>
      </div>
    </div>
  );
}
