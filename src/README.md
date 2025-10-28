# Fire Officer Role Exercise

An interactive drag-and-drop training application for fire officers to practice categorizing scenarios into three key leadership responsibilities.

## Overview

This training exercise helps fire officers understand and practice the three core aspects of their role:
- **Lead the Crew** - Direct tasks and communicate clearly
- **Manage Accountability** - Set expectations and document follow through
- **Maintain Station Readiness** - Ensure equipment and training are ready

## Features

- **Drag-and-Drop Interface** - Intuitive card-based interaction for sorting scenarios
- **Immediate Validation** - Check answers only when all categories have exactly 2 cards
- **Visual Feedback** - Green borders for correct placements, red for incorrect
- **Reset Functionality** - Remove individual cards or reset all at once
- **Responsive Design** - Optimized for 1920x700px display

## How to Use

1. Read each scenario card carefully
2. Drag cards from the left panel to the appropriate officer role category
3. Place exactly 2 cards in each of the 3 categories
4. Click "Check Answers" to validate your choices
5. Review feedback - correct answers show green borders, incorrect show red
6. Use the X button to remove individual cards or "Reset All" to start over

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **react-dnd** - Drag-and-drop functionality
- **shadcn/ui** - UI components
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
├── App.tsx                          # Main application entry
├── components/
│   ├── OfficerTrainingExercise.tsx  # Main exercise component
│   ├── DraggableCard.tsx            # Draggable scenario card
│   ├── DropZone.tsx                 # Drop zone for categories
│   └── ui/                          # shadcn/ui components
└── styles/
    └── globals.css                  # Global styles and theme
```

## Scenarios Included

1. **Unassigned Door Forcing** - Freelancing during fire attack
2. **TIC Battery Low** - Equipment readiness issue
3. **Signed Off Checks, Missed Work** - Accountability documentation
4. **Cross Talk During Drill** - Communication breakdown
5. **Overdue Hose Testing** - Station readiness maintenance
6. **Coaching Not Documented** - Follow-up accountability

## Answer Key

- **Lead the Crew**: Scenarios 1 & 4
- **Manage Accountability**: Scenarios 3 & 6
- **Maintain Station Readiness**: Scenarios 2 & 5

## Customization

### Changing the Primary Color

Edit `/styles/globals.css`:
```css
--primary: #802f2d;  /* Your color here */
```

### Adding New Scenarios

Edit the `scenarios` array in `/components/OfficerTrainingExercise.tsx`:
```typescript
{
  id: 7,
  text: "Your scenario description",
  correctZone: "lead" | "accountability" | "readiness",
  feedback: "Your feedback message"
}
```

### Adjusting Canvas Size

Edit `/App.tsx`:
```typescript
<div className="w-[1920px] h-[700px]">
```

## License

This project is available for educational and training purposes.
