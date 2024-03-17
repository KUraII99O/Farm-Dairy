import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../Translator/Provider';

interface CowFeedChartProps {
  data: {
    stallNumber: string;
    grass: string;
    salt: string;
    water: string;
  }[];
}

const CowFeedChart: React.FC<CowFeedChartProps> = ({ data }) => {
  const { translate } = useTranslation(); // Use your translation hook or context

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold mb-4 text-secondary">
        <FontAwesomeIcon icon={faUtensils} className="mr-2" />
        {translate('CowFeedChart')} {/* Translate the chart title */}
      </h2>
      <table className="min-w-full bg-white border border-secondary">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">{translate('StallNumber')}</th> {/* Translate table headers */}
            <th className="py-2 px-4 border-b">{translate('Grass')}</th>
            <th className="py-2 px-4 border-b">{translate('Salt')}</th>
            <th className="py-2 px-4 border-b">{translate('Water')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.stallNumber}>
              <td className="py-2 px-4 border-b">{item.stallNumber}</td>
              <td className="py-2 px-4 border-b">
                <span className="flex items-center">
                  🌱 {item.grass}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <span className="flex items-center">
                  🧂 {item.salt}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <span className="flex items-center">
                  💧 {item.water}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-secondary text-black py-2 px-4 rounded hover:bg-primary">
        {translate('SetFeedChart')} {/* Translate the button text */}
      </button>
    </div>
  );
};

export default CowFeedChart;
