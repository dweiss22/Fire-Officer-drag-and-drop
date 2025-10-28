import { useState } from 'react';
import { DraggableCard } from './DraggableCard';
import { DropZone } from './DropZone';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface ScenarioCard {
  id: number;
  text: string;
  correctZone: string;
  feedback: string;
}

export interface DropZoneConfig {
  id: string;
  title: string;
  description: string;
}

const scenarios: ScenarioCard[] = [
  {
    id: 1,
    text: "Unassigned Door Forcing – As you prep to deploy a hoseline for fire attack, a firefighter starts forcing a side door without assignment; radio traffic is getting crowded.",
    correctZone: "lead",
    feedback: "Stop freelancing, reassign clearly, confirm the comms plan—unity of command protects safety and tempo."
  },
  {
    id: 2,
    text: "TIC Battery Low – Morning checks show the thermal imager battery is low and there is no spare battery in the charger; training is scheduled for 0900.",
    correctZone: "readiness",
    feedback: "Tag/replace battery now, verify spares, adjust plan if needed, and capture the process gap."
  },
  {
    id: 3,
    text: "Signed Off Checks, Missed Work – Last shift's rig checks were initialed, but two compartments are disorganized and a saw wasn't started.",
    correctZone: "accountability",
    feedback: "\"No check by pen.\" Coach privately, set expectation, and document to prevent repeat issues."
  },
  {
    id: 4,
    text: "Cross Talk During Drill – In a search/vent drill, members talk over each other and roles blur between the two crews.",
    correctZone: "lead",
    feedback: "Set command intent, assign roles, and use closed loop communication to keep tasks synchronized."
  },
  {
    id: 5,
    text: "Overdue Hose Testing – Annual hose test is two weeks overdue because the calendar wasn't updated; shift commander is visiting tomorrow.",
    correctZone: "readiness",
    feedback: "Bring testing current immediately, update schedules, and brief the crew—readiness is measurable."
  },
  {
    id: 6,
    text: "Coaching Not Documented – In today's AAR you realize the same slow PPE donning happened last week—and your coaching wasn't documented.",
    correctZone: "accountability",
    feedback: "Patterns require documentation plus follow up dates; coaching that isn't recorded rarely changes behavior."
  }
];

const dropZones: DropZoneConfig[] = [
  {
    id: "lead",
    title: "Lead the Crew",
    description: "Direct tasks and communicate clearly"
  },
  {
    id: "accountability",
    title: "Manage Accountability",
    description: "Set expectations and document follow through"
  },
  {
    id: "readiness",
    title: "Maintain Station Readiness",
    description: "Ensure equipment and training are ready"
  }
];

export function OfficerTrainingExercise() {
  const [cardPlacements, setCardPlacements] = useState<Record<number, string>>({});
  const [hasChecked, setHasChecked] = useState(false);

  const handleCardDrop = (cardId: number, zoneId: string) => {
    setHasChecked(false);
    
    setCardPlacements(prev => ({
      ...prev,
      [cardId]: zoneId
    }));
  };

  const handleCardRemove = (cardId: number) => {
    setHasChecked(false);
    setCardPlacements(prev => {
      const newPlacements = { ...prev };
      delete newPlacements[cardId];
      return newPlacements;
    });
  };

  const handleReset = () => {
    setCardPlacements({});
    setHasChecked(false);
    toast.info('Reset', {
      description: 'All cards have been returned.',
      duration: 2000
    });
  };

  const handleCheckAnswers = () => {
    setHasChecked(true);
    
    const correctCount = Object.entries(cardPlacements).filter(([cardId, zoneId]) => {
      const card = scenarios.find(s => s.id === Number(cardId));
      return card?.correctZone === zoneId;
    }).length;

    if (correctCount === 6) {
      toast.success('Perfect Score!', {
        description: 'All scenarios correctly categorized. Outstanding work!',
        duration: 6000
      });
    } else {
      toast.error('Not all correct', {
        description: `${correctCount} out of 6 are correct. Green cards are correct, red cards need to be moved.`,
        duration: 6000
      });
    }
  };

  const unplacedCards = scenarios.filter(card => !cardPlacements[card.id]);

  // Check if each zone has exactly 2 cards
  const cardsPerZone = dropZones.reduce((acc, zone) => {
    const count = Object.values(cardPlacements).filter(zoneId => zoneId === zone.id).length;
    acc[zone.id] = count;
    return acc;
  }, {} as Record<string, number>);

  const canCheckAnswers = dropZones.every(zone => cardsPerZone[zone.id] === 2);

  return (
    <div className="h-full flex flex-col p-8 gap-6">
      {/* Header */}
      <div className="flex-shrink-0 flex items-start justify-between">
        <div>
          <h1 className="text-primary mb-2">Fire Officer Role Exercise</h1>
          <p className="text-slate-600">
            Drag each card to the officer role it best represents. Two cards belong in each category.
          </p>
        </div>
        <div className="flex gap-2">
          {canCheckAnswers && (
            <Button onClick={handleCheckAnswers} variant="default" size="sm">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Check Answers
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left: Unplaced Cards */}
        <div className="w-[500px] flex-shrink-0 bg-white rounded-lg border border-slate-200 p-4 overflow-y-auto">
          <h2 className="text-slate-700 mb-3">Scenario Cards</h2>
          <div className="space-y-3">
            {unplacedCards.map(card => (
              <DraggableCard key={card.id} card={card} onRemove={handleCardRemove} />
            ))}
            {unplacedCards.length === 0 && (
              <p className="text-slate-400 text-center py-8">All cards placed</p>
            )}
          </div>
        </div>

        {/* Right: Drop Zones */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {dropZones.map(zone => {
            const cardsInZone = Object.entries(cardPlacements)
              .filter(([_, zoneId]) => zoneId === zone.id)
              .map(([cardId]) => scenarios.find(s => s.id === Number(cardId))!);

            return (
              <DropZone
                key={zone.id}
                zone={zone}
                cards={cardsInZone}
                onDrop={handleCardDrop}
                onRemove={handleCardRemove}
                showResults={hasChecked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
