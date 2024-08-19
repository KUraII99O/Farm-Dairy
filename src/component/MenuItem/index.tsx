// SubmenuItem.tsx
import React from "react";
import { Link } from "react-router-dom";

interface SubmenuItemProps {
  items: { name: string; link: string }[];
}

const SubmenuItem: React.FC<SubmenuItemProps> = ({ items }) => {
  return (
    <ul className="ml-6">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            to={item.link}
            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubmenuItem;
