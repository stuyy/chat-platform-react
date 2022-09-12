import { FC, useRef, Dispatch, SetStateAction } from 'react';
import { FileInput } from '../../../utils/styles/inputs/Textarea';
import { SettingsProfileBanner } from '../../../utils/styles/settings';
import { DivMouseEvent, InputChangeEvent } from '../../../utils/types';

type Props = {
  source: string;
  sourceCopy: string;
  setSourceCopy: Dispatch<SetStateAction<string>>;
};

export const UserBanner: FC<Props> = ({
  source,
  sourceCopy,
  setSourceCopy,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const onBannerClick = (e: DivMouseEvent) => fileInputRef.current?.click();
  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setSourceCopy(file ? URL.createObjectURL(file) : source);
  };

  return (
    <>
      <SettingsProfileBanner
        ref={bannerRef}
        onClick={onBannerClick}
        backgroundUrl={sourceCopy}
      />
      <FileInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />
    </>
  );
};
