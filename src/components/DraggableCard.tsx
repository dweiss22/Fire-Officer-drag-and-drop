import { useDrag } from 'react-dnd';
import { GripVertical, X } from 'lucide-react';
import type { ScenarioCard } from './OfficerTrainingExercise';

interface DraggableCardProps {
  card: ScenarioCard;
  isPlaced?: boolean;
  onRemove?: (cardId: number) => void;
  showResults?: boolean;
  isCorrect?: boolean;
}

export function DraggableCard({ card, isPlaced = false, onRemove, showResults = false, isCorrect = false }: DraggableCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SCENARIO_CARD',
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  let borderColor = 'border-slate-300';
  let bgColor = isPlaced ? 'bg-slate-50' : 'bg-white';
  
  if (showResults && isPlaced) {
    if (isCorrect) {
      borderColor = 'border-green-500';
      bgColor = 'bg-green-50';
    } else {
      borderColor = 'border-red-500';
      bgColor = 'bg-red-50';
    }
  }

  return (
    <div
      ref={drag}
      className={`border-2 rounded p-3 cursor-move hover:shadow-sm transition-all ${
        isDragging ? 'opacity-40' : 'opacity-100'
      } ${bgColor} ${borderColor} ${!showResults && !isPlaced ? 'hover:border-slate-400' : ''}`}
    >
      <div className="flex gap-2">
        <GripVertical className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-700 flex-1">{card.text}</p>
        {isPlaced && onRemove && (
          <button
            onClick={() => onRemove(card.id)}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Remove card"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
