import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';
import Text from '@/components/Text';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { Wrapper } from './EstimatedFee.styled';
import { AssetsContext } from '@/contexts/assets-context';
import web3Provider from '@/connections/custom-web3-provider';
import useAsyncEffect from 'use-async-effect';

interface IProps {
  txSize: number;
  classNames?: string;
}

const EstimatedFee: React.FC<IProps> = ({ txSize, classNames }: IProps): React.ReactElement => {
  const { feeRate } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState('0');
  const [estTCFee, setEstTCFee] = useState('0');

  const calculateEstBtcFee = useCallback(() => {
    const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: txSize,
      feeRatePerByte: feeRate.hourFee,
    });

    setEstBTCFee(estimatedEconomyFee.totalFee.toString());
  }, [txSize, setEstBTCFee, feeRate.hourFee]);

  useEffect(() => {
    calculateEstBtcFee();
  }, [txSize, calculateEstBtcFee]);

  useAsyncEffect(async () => {
    const tcFee = await web3Provider.getEstimatedTransactionFee();
    setEstTCFee(tcFee);
  }, [])

  return (
    <Wrapper className={classNames}>
      <div className="est-fee">
        <Text className='est-fee-title' size="regular" fontWeight="medium" color="bg1">
          Network fee estimate
        </Text>
        <div className="est-fee-options">
          <div
            className={`est-fee-item`}
          >
            <p className='est-fee-item-title'>
              BTC network fee
            </p>
            <p className='est-fee-item-value'>
              ~ {formatBTCPrice(estBTCFee)} BTC
            </p>
          </div>
          <div
            className={`est-fee-item`}
          >
            <p className='est-fee-item-title'>
              TC network fee
            </p>
            <p className='est-fee-item-value'>
              ~ {formatEthPrice(estTCFee)} TC
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default EstimatedFee;
