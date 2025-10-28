import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OfficerTrainingExercise } from './components/OfficerTrainingExercise';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[1920px] h-[700px] bg-slate-50 overflow-hidden">
        <OfficerTrainingExercise />
        <Toaster />
      </div>
    </DndProvider>
  );
}
