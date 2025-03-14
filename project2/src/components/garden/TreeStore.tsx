import React from 'react';
import { ShoppingCart, Coins } from 'lucide-react';

interface TreeStoreProps {
  setTrees: React.Dispatch<React.SetStateAction<any[]>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

export function TreeStore({ setTrees, coins, setCoins }: TreeStoreProps) {
  const storeItems = [
    { id: 1, name: 'Cherry Blossom', emoji: '🌸', price: 100, type: 'special' },
    { id: 2, name: 'Pine Tree', emoji: '🌲', price: 150, type: 'rare' },
    { id: 3, name: 'Palm Tree', emoji: '🌴', price: 200, type: 'special' },
    { id: 4, name: 'Maple Tree', emoji: '🍁', price: 250, type: 'rare' },
    { id: 5, name: 'Sakura', emoji: '🌸', price: 300, type: 'special', seasonal: true },
    { id: 6, name: 'Evergreen', emoji: '🎄', price: 350, type: 'rare', seasonal: true },
  ];

  const purchaseTree = (item: typeof storeItems[0]) => {
    if (coins >= item.price) {
      const newTree = {
        id: Date.now().toString(),
        type: item.type,
        emoji: item.emoji,
        name: item.name,
        plantedDate: new Date(),
        source: 'store'
      };

      setTrees(prev => [...prev, newTree]);
      setCoins(prev => prev - item.price);
    }
  };

  return (
    <div className="gaming-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-green-400" />
          Tree Store
        </h2>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-white">{coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {storeItems.map(item => (
          <div key={item.id} className="gaming-card p-4 hover:scale-105 transition-transform">
            <div className="text-center mb-4">
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="text-white font-medium mt-2">{item.name}</h3>
              {item.seasonal && (
                <span className="text-xs text-yellow-400">Limited Time!</span>
              )}
            </div>
            <button
              onClick={() => purchaseTree(item)}
              disabled={coins < item.price}
              className={`w-full gaming-card py-2 px-4 flex items-center justify-center gap-2 
                ${coins >= item.price ? 'hover:bg-white/10' : 'opacity-50 cursor-not-allowed'}
                transition-colors`}
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-white">{item.price}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 