export type Sign = {
  name: string;
  category: "Medical" | "Danger" | "Assistance" | "Communication";
  description: string;
};

export const EMERGENCY_SIGNS: Sign[] = [
  { name: "Help", category: "Assistance", description: "Flat hand on fist, lift both upward." },
  { name: "Emergency", category: "Danger", description: "Shake an E handshape near the shoulder." },
  { name: "Doctor", category: "Medical", description: "Tap fingertips on the opposite wrist." },
  { name: "Hospital", category: "Medical", description: "Draw a cross on the upper arm." },
  { name: "Ambulance", category: "Medical", description: "Rotate a flat hand above the head." },
  { name: "Police", category: "Assistance", description: "Tap a C handshape at the shoulder." },
  { name: "Fire", category: "Danger", description: "Wiggle fingers upward, palms in." },
  { name: "Pain", category: "Medical", description: "Point index fingers toward each other." },
  { name: "Bleeding", category: "Medical", description: "Trickle fingers down from the hand." },
  { name: "Breathe", category: "Medical", description: "Move both hands out from the chest." },
  { name: "Choking", category: "Medical", description: "Grip the throat with a C hand." },
  { name: "Heart Attack", category: "Medical", description: "Tap the chest, then a fist strike." },
  { name: "Allergy", category: "Medical", description: "Index finger to nose, then pull apart." },
  { name: "Medicine", category: "Medical", description: "Middle finger circles the open palm." },
  { name: "Water", category: "Assistance", description: "Tap a W handshape at the chin." },
  { name: "Food", category: "Assistance", description: "Bring pinched fingers to the mouth." },
  { name: "Cold", category: "Medical", description: "Shake two fists close to the body." },
  { name: "Hot", category: "Medical", description: "Claw hand turns away from the mouth." },
  { name: "Dizzy", category: "Medical", description: "Claw hand circles in front of the face." },
  { name: "Faint", category: "Medical", description: "Fingers drop from the head downward." },
  { name: "Fall", category: "Danger", description: "Two fingers flip off the flat palm." },
  { name: "Accident", category: "Danger", description: "Two fists collide in front of you." },
  { name: "Stop", category: "Danger", description: "Chop one flat hand onto the other palm." },
  { name: "Danger", category: "Danger", description: "Thumb strikes upward past a closed fist." },
  { name: "Lost", category: "Assistance", description: "Open both hands downward from a fist." },
  { name: "Call", category: "Communication", description: "Y handshape moves toward the ear." },
  { name: "Phone", category: "Communication", description: "Hold a Y handshape at the face." },
  { name: "Yes", category: "Communication", description: "Nod a fist like a knocking head." },
  { name: "No", category: "Communication", description: "Snap two fingers to the thumb." },
  { name: "Wait", category: "Communication", description: "Wiggle fingers with palms up." },
];
