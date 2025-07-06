
import React from 'react';
import { Edit, Trash2, Calendar, Package } from 'lucide-react';
import { PantryItem } from '@/types';
import { cn } from '@/lib/utils';

interface PantryItemCardProps {
  item: PantryItem;
  onEdit: (item: PantryItem) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  fresh: { color: 'text-green-600 bg-green-50 border-green-200', label: 'Fresh' },
  'expiring-soon': { color: 'text-orange-600 bg-orange-50 border-orange-200', label: 'Expiring Soon' },
  'expiring-today': { color: 'text-red-600 bg-red-50 border-red-200', label: 'Expires Today' },
  expired: { color: 'text-red-700 bg-red-100 border-red-300', label: 'Expired' },
};

export const PantryItemCard: React.FC<PantryItemCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const statusStyle = statusConfig[item.status];
  const expiryDate = new Date(item.expiryDate);
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{item.category}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package size={14} />
          <span>Quantity: {item.quantity}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>Expires: {expiryDate.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium border', statusStyle.color)}>
          {statusStyle.label}
        </span>
        {daysUntilExpiry >= 0 && (
          <span className="text-xs text-gray-500">
            {daysUntilExpiry === 0 ? 'Today' : `${daysUntilExpiry} days left`}
          </span>
        )}
      </div>
    </div>
  );
};
