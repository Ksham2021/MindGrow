import React, { useState } from 'react';
import { Edit2, Move } from 'lucide-react';

interface GardenGridProps {
  trees: Array<{
    id: string;
    emoji: string;
    name: string;
    plantedDate: Date;
  }>;
  setTrees: React.Dispatch<React.SetStateAction<any[]>>;
}

export function GardenGrid({ trees, setTrees }: GardenGridProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [isArranging, setIsArranging] = useState(false);

  const handleNameEdit = (id: string, newName: string) => {
    setTrees(prev => prev.map(tree => 
      tree.id === id ? { ...tree, name: newName } : tree
    ));
    setEditingId(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newTrees = [...trees];
    const [draggedTree] = newTrees.splice(dragIndex, 1);
    newTrees.splice(dropIndex, 0, draggedTree);
    setTrees(newTrees);
  };

  return (
    <div className="gaming-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Your Garden</h2>
        <button
          onClick={() => setIsArranging(!isArranging)}
          className={`gaming-card px-4 py-2 flex items-center gap-2
            ${isArranging ? 'bg-white/10' : ''}`}
        >
          <Move className="w-4 h-4" />
          <span>{isArranging ? 'Done' : 'Arrange'}</span>
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {trees.map((tree, index) => (
          <div
            key={tree.id}
            draggable={isArranging}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            className={`aspect-square gaming-card p-2 hover:scale-105 transition-transform
              ${isArranging ? 'cursor-move' : ''}`}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">{tree.emoji}</span>
              {editingId === tree.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleNameEdit(tree.id, editName)}
                  className="w-full text-center bg-white/10 rounded px-1 text-sm"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-white/60">{tree.name}</span>
                  <button
                    onClick={() => {
                      setEditingId(tree.id);
                      setEditName(tree.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-3 h-3 text-white/40" />
                  </button>
                </div>
              )}
              <span className="text-xs text-white/40 mt-1">
                {new Date(tree.plantedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 