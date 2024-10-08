import { memo, useCallback, useEffect, useState } from 'react';
import { getContentType } from '../../../utils/customFn/contentTypeGetter';
import {
  imageReaderContainer,
  imageSrc,
  nextButton,
  prevButton,
} from '../../../styles/pc/windows/imageReader.css';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useElementStore } from '../../../store/element.store';
import { srcUrl } from '../../../api/urls';
import { useQueryClient } from '@tanstack/react-query';
import { downloadFileQueryOption } from '../../../utils/queryOptions/file.query';
import { CircularLoading } from '../CircularLoading';

export const Viewer = memo(
  ({
    fileKey,
    setTitle,
  }: {
    fileKey: string;
    setTitle: (title: string) => void;
  }): React.ReactElement => {
    const queryClient = useQueryClient();

    // states
    const [targetKey, setTargetKey] = useState<string>(fileKey);
    const [siblings, setSiblings] = useState<string[]>([]);
    const [contentIdx, setContentIdx] = useState<number>(0);
    const [url, setUrl] = useState<string>(srcUrl(fileKey));
    const [loading, setLoading] = useState<boolean>(false);
    const [contentType, setContentType] = useState<string>('');

    // store functions
    const getElementInfo = useElementStore((state) => state.getElementInfo);
    const getElementInfoByParentKey = useElementStore(
      (state) => state.getElementInfoByParentKey
    );

    useEffect(() => {
      const info = getElementInfo(targetKey);
      setContentIdx(siblings.indexOf(targetKey));
      setTitle(info?.name ?? '');
      setContentType(getContentType(info?.name ?? '') ?? '');
      setLoading(true);
      queryClient.ensureQueryData(
        downloadFileQueryOption(targetKey),
      ).then((data) => {
        setUrl(URL.createObjectURL(data));
      }).finally(() => {
        setLoading(false);
      });
    }, [targetKey, getElementInfo, siblings, setTitle, queryClient]);

    useEffect(() => {
      const info = getElementInfo(fileKey);
      setSiblings(
        getElementInfoByParentKey(info?.parentKey ?? '')
          .filter((info) => info.type === 'file')
          .filter(
            (info) =>
              getContentType(info.name)?.startsWith('image') ||
              getContentType(info.name)?.startsWith('video')
          )
          .map((info) => info.key)
      );
    }, [fileKey, getElementInfo, getElementInfoByParentKey]);

    const handleNext = useCallback(() => {
      if (contentIdx + 1 < siblings.length) {
        setTargetKey(siblings[contentIdx + 1]);
      }
    }, [contentIdx, siblings]);

    const handlePrev = useCallback(() => {
      if (contentIdx > 0) {
        setTargetKey(siblings[contentIdx - 1]);
      }
    }, [contentIdx, siblings]);

    return (
      <div className={imageReaderContainer}>
        {contentIdx > 0 && (
          <MdNavigateBefore onClick={handlePrev} className={prevButton} />
        )}
        {contentIdx + 1 < siblings.length && (
          <MdNavigateNext onClick={handleNext} className={nextButton} />
        )}
        {loading && <CircularLoading />}
        {!loading && contentType.startsWith('image') && (
          <img className={imageSrc} src={url} alt={'image'} />
        )}
        {!loading && contentType.startsWith('video') && (
          <video className={imageSrc} src={url} controls />
        )}
      </div>
    );
  }
);
