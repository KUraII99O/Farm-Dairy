import React from 'react';
import { useTranslation } from '../Translator/Provider';

const Footer: React.FC = () => {
  const { translate, setLanguage, language } = useTranslation();

  const handleChangeLanguage = (newLanguage: string) => {
    console.log('Changing language to:', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div className="bg-secondary p-4 mt-auto flex justify-between items-center">
      <span>{translate('copyright')}</span>
      <div className="flex items-center">
        <select value={language} onChange={(e) => handleChangeLanguage(e.target.value)} className="mr-2">
          <option value="en">🇺🇸</option> {/* USA flag emoji */}
          <option value="fr">🇫🇷</option> {/* France flag emoji */}
          <option value="ar">🇹🇳</option> {/* Tunisia flag emoji */}
        </select>
      </div>
    </div>
  );
};

export default Footer;
