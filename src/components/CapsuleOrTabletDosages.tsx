import * as React from 'react';
import {
  FC, useCallback, useContext, useEffect, useState,
} from 'react';
import CapsuleOrTabletUnit from './CapsuleOrTabletUnit';
import { PrescriptionFormContext } from './PrescriptionForm/PrescriptionForm';
import { CapsuleTabletDosage } from '../types';
import { useDosageSumAndDifferenceMessage } from '../hooks/useDosageSumDifference';

interface Props {
  time: 'Prior' | 'Upcoming';
  dosages: { [key: string]: number }
}

const CapsuleOrTabletDosages: FC<Props> = ({ time, dosages }) => {
  const context = useContext(PrescriptionFormContext);
  const {
    chosenDrugForm, dosageOptions, priorDosagesQty, upcomingDosagesQty,
  } = context;
  const [dosageDifferenceMessage, calculateDosageSum] = useDosageSumAndDifferenceMessage(time, priorDosagesQty, upcomingDosagesQty);

  return (
    <>
      <div>
        {time}
        {' '}
        Dosage
      </div>
      <div style={{ display: 'flex' }}>
        {(dosageOptions as CapsuleTabletDosage[])
          .map((v: { dosage: string; isScored?: boolean }, i) => (
          <CapsuleOrTabletUnit
            key={`${time}_${chosenDrugForm!.form}_${v.dosage}`}
            time={time}
            form={chosenDrugForm!.form}
            dosage={v.dosage}
            isScored={v.isScored ? v.isScored : undefined}
            isMinDosage={i === 0}
          />))
        }
      </div>
      {time === 'Upcoming' && dosageDifferenceMessage
      && (
      <div style={{ color: 'red' }}>
        {dosageDifferenceMessage}
      </div>
      )}
      <div>
        Total:
        {calculateDosageSum(dosages)}
        {' '}
        {chosenDrugForm!.measureUnit}
      </div>
    </>
  );
};

export default CapsuleOrTabletDosages;
