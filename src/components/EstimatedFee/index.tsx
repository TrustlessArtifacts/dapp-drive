import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';
import Text from '@/components/Text';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { Wrapper } from './EstimatedFee.styled';
import { AssetsContext } from '@/contexts/assets-context';
import web3Provider from '@/connections/custom-web3-provider';
import useAsyncEffect from 'use-async-effect';
import { compressFileAndGetSize } from '@/services/file';
import { readFileAsBuffer } from '@/utils';
import logger from '@/services/logger';
import { TRANSFER_TX_SIZE } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import EllipsisLoading from '../EllipsisLoading';

interface IProps {
  file: File | null;
  classNames?: string;
}

const EstimatedFee: React.FC<IProps> = ({ file, classNames }: IProps): React.ReactElement => {
  const { feeRate } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);

  const calculateEstBtcFee = useCallback(async () => {
    if (!file) return;
    try {
      let tcTxSizeByte = TRANSFER_TX_SIZE;
      if (file.size < BLOCK_CHAIN_FILE_LIMIT) {
        const fileBuffer = await readFileAsBuffer(file);
        const { compressedSize } = await compressFileAndGetSize({
          fileBase64: fileBuffer.toString('base64')
        });
        tcTxSizeByte = TRANSFER_TX_SIZE + compressedSize;
      }
      const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
        tcTxSizeByte: tcTxSizeByte,
        feeRatePerByte: feeRate.hourFee,
      });

      setEstBTCFee(estimatedEconomyFee.totalFee.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [file, setEstBTCFee, feeRate.hourFee]);

  useEffect(() => {
    calculateEstBtcFee();
  }, [file, calculateEstBtcFee]);

  useAsyncEffect(async () => {
    const tcFee = await web3Provider.getEstimatedTransactionFee();
    setEstTCFee(tcFee);
  }, [])

  return (
    <Wrapper className={classNames}>
      <div className="est-fee">
        <Text className='est-fee-title' size="regular" fontWeight="medium" color="bg1">
          Network fee estimation
        </Text>
        <div className="est-fee-options">
          <div
            className={`est-fee-item`}
          >
            <p className='est-fee-item-title'>
              BTC network fee
            </p>
            <p className='est-fee-item-value'>
              {estBTCFee ? `~ ${formatBTCPrice(estBTCFee)} BTC` : <EllipsisLoading />}
            </p>
          </div>
          <div
            className={`est-fee-item`}
          >
            <p className='est-fee-item-title'>
              TC network fee
            </p>
            <p className='est-fee-item-value'>
              {estTCFee ? `~ ${formatEthPrice(estTCFee)} TC` : <EllipsisLoading />}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default EstimatedFee;
