import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

interface CowFeedChartProps {
  data: {
    stallNumber: string;
    grass: string;
    salt: string;
    water: string;
  }[];
}

const CowFeedChart: React.FC<CowFeedChartProps> = ({ data }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        <FontAwesomeIcon icon={faUtensils} className="mr-2" />
        Cow Feed Chart
      </h2>
      <table className="min-w-full bg-white border border-green-500">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Stall Number</th>
            <th className="py-2 px-4 border-b">Grass</th>
            <th className="py-2 px-4 border-b">Salt</th>
            <th className="py-2 px-4 border-b">Water</th>
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
      <button className="mt-4 bg-green-200 text-black py-2 px-4 rounded hover:bg-gradient-to-r from-emerald-600 to-emerald-500">
        Set Feed Chart
      </button>
    </div>
  );
};

export default CowFeedChart;
