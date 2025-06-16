import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useTitle = (title) => {
    const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title =`${title} `;
    
    return () => {
      document.title =(t('biz_360')); // Default title
    };
  }, [title]); 
};

export default useTitle;