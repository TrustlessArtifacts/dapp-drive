import { MempoolContext } from '@/contexts/mempool-context';
import React, { memo, useContext } from 'react';
import Text from '@/components/Text';
import * as TC_SDK from 'trustless-computer-sdk';
import { formatBTCPrice } from '@/utils/format';
import { FileEstimateFee } from './FileEstimateFee.styled';

interface IProps {
  file: File | null;
}

const EstimateFee: React.FC<IProps> = ({
  file
}: IProps) => {
  const { feeRate } = useContext(MempoolContext);

  const calculateFee = (feeRatePerByte: number): string | null => {
    if (!file) return null;

    const estimatedFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: file.size,
      feeRatePerByte,
    });

    return estimatedFee.totalFee.toString();
  };

  const renderEstFee = ({
    title,
    feeRatePerByte,
  }: {
    title: string;
    feeRatePerByte: number;
  }) => {
    return (
      <div
        className='est-fee-item'
      >
        <div>
          <Text fontWeight="medium" color="text2" size="regular">
            {title}
          </Text>
          <Text color="text8" className="mb-10">
            {feeRatePerByte} sats/vByte
          </Text>
          <p className="ext-price">
            {formatBTCPrice(calculateFee(feeRatePerByte))} <span>BTC</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <FileEstimateFee>
      <div className="est-fee">
        <Text size="regular" fontWeight="medium" color="text2" className="title-text">
          Estimated network fee
        </Text>
        <div className="est-fee-options">
          {renderEstFee({
            title: 'Economy',
            feeRatePerByte: feeRate.hourFee,
          })}
          {renderEstFee({
            title: 'Faster',
            feeRatePerByte: feeRate.halfHourFee,
          })}
          {renderEstFee({
            title: 'Fastest',
            feeRatePerByte: feeRate.fastestFee,
          })}
        </div>
      </div>
    </FileEstimateFee>
  )
}

export default memo(EstimateFee);
