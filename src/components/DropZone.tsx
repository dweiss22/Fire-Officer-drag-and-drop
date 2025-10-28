import { useDrop } from 'react-dnd';
import { DraggableCard } from './DraggableCard';
import type { ScenarioCard, DropZoneConfig } from './OfficerTrainingExercise';

interface DropZoneProps {
  zone: DropZoneConfig;
  cards: ScenarioCard[];
  onDrop: (cardId: number, zoneId: string) => void;
  onRemove: (cardId: number) => void;
  showResults?: boolean;
}

export function DropZone({ zone, cards, onDrop, onRemove, showResults = false }: DropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SCENARIO_CARD',
    drop: (item: { id: number }) => {
      onDrop(item.id, zone.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Zone Header */}
      <div className="bg-primary text-white p-3 rounded-t-lg">
        <h3 className="mb-1">{zone.title}</h3>
        <p className="text-white/80 text-sm">{zone.description}</p>
      </div>

      {/* Drop Area */}
      <div
        ref={drop}
        className={`flex-1 bg-white border-2 border-dashed rounded-b-lg p-3 transition-colors ${
          isOver ? 'border-primary/60 bg-primary/5' : 'border-slate-300'
        }`}
      >
        <div className="space-y-2">
          {cards.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              Drop 2 cards here
            </div>
          ) : (
            cards.map(card => {
              const isCorrect = card.correctZone === zone.id;
              return (
                <DraggableCard
                  key={card.id}
                  card={card}
                  isPlaced={true}
                  onRemove={onRemove}
                  showResults={showResults}
                  isCorrect={isCorrect}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
