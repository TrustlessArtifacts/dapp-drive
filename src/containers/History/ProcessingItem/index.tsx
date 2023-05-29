import { IUploadFileResponseItem } from '@/interfaces/api/files';
import React from 'react';
import s from './styles.module.scss'

interface IProps {
  file: IUploadFileResponseItem;
}

const ProcessingItem: React.FC<IProps> = ({ file }: IProps) => {
  return (
    <div className={s.processingItem}>
      aaaa
    </div>
  )
}

export default ProcessingItem;
