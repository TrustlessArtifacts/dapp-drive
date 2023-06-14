import { IMAGE_TYPE } from '@/components/NFTDisplayBox/constant';

export interface IOwnedBNS {
  id: string;
  tokenId: string;
  tokenIdInt: number;
  name: string;
  owner: string;
  collectionAddress: string;
  resolver: string;
  pfp?: string;
  pfpData?: {
    gcsUrl?: string;
    filename?: string;
  };
}
export interface IInscription {
  id: string;
  collection: string;
  name: string;
  tokenId: string;
  tokenUri: string;
  attributes: [{ traitType: string; value: string }];
  metadataType: string;
  contentType: IMAGE_TYPE;
  createdAt: string;
  updatedAt: string;
  mintedAt: number;
  collectionAddress: string;
  owner: string;
  image?: string;
  fileSize?: number;
  size?: number;
  bnsData?: IOwnedBNS[];
}
