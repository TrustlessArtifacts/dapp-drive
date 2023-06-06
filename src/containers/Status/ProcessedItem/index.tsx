import { IUploadFileResponseItem } from "@/interfaces/api/files";
import React from 'react';

interface IProps {
  file?: IUploadFileResponseItem;
  index?: number;
}

const ProcessedItem: React.FC<IProps> = () => {
  return <div>ProcessedItem</div>;
};

export default ProcessedItem;
