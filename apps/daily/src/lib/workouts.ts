export type Exercise = {
  name: string;
  detail: string;
  sets: string;
  reps: string;
};

export type Workout = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  exercises: Exercise[];
  notes: string;
};

export const workouts: Workout[] = [
  {
    id: "strength-upper",
    name: "Strength A: Upper Body",
    description: "Push/pull with dumbbells and kettlebell. Shoulders, chest, back, arms.",
    durationMinutes: 18,
    exercises: [
      {
        name: "Kettlebell Halo",
        detail:
          "Hold KB by the horns at chest. Circle it around your head slowly, keeping core tight. Warms up shoulders and thoracic spine.",
        sets: "1",
        reps: "8 each direction",
      },
      {
        name: "Dumbbell Overhead Press",
        detail:
          "Standing, press both dumbbells overhead. Lock out at top, controlled descent. Keep core braced, don't arch lower back.",
        sets: "3",
        reps: "10",
      },
      {
        name: "Dumbbell Bent-Over Row",
        detail:
          "Hinge forward at hips, flat back. Pull dumbbell to hip, squeeze shoulder blade at top. Slow on the way down.",
        sets: "3",
        reps: "10 each arm",
      },
      {
        name: "Kettlebell Floor Press",
        detail:
          "Lie on floor, press KB up from chest level. Floor limits range of motion which is easier on shoulders than a bench.",
        sets: "3",
        reps: "10 each arm",
      },
      {
        name: "Push-ups",
        detail:
          "Full range of motion. Chest to floor, full lockout. From knees if needed — build up.",
        sets: "3",
        reps: "max (aim 10-15)",
      },
      {
        name: "Dumbbell Curl to Press",
        detail:
          "Curl both dumbbells up, then press overhead in one motion. Finisher for biceps and shoulders.",
        sets: "2",
        reps: "10",
      },
    ],
    notes: "Rest 30-60 sec between sets. Focus on controlled movement, not speed.",
  },
  {
    id: "strength-lower",
    name: "Strength B: Lower Body + Core",
    description: "Legs, glutes, core. Kettlebell-heavy day.",
    durationMinutes: 18,
    exercises: [
      {
        name: "Kettlebell Goblet Squat (warmup)",
        detail:
          "Hold KB at chest by the horns. Squat deep, elbows inside knees at bottom. Light and slow.",
        sets: "2",
        reps: "8",
      },
      {
        name: "Kettlebell Deadlift",
        detail:
          "KB on floor between feet. Hip hinge to grab it, drive hips forward to stand. Squeeze glutes at top. Foundation movement.",
        sets: "3",
        reps: "12",
      },
      {
        name: "Dumbbell Reverse Lunge",
        detail:
          "Hold dumbbells at sides. Step back, knee just above floor. Drive through front foot to stand. Alternate legs.",
        sets: "3",
        reps: "10 each leg",
      },
      {
        name: "Kettlebell Swing",
        detail:
          "Hip hinge, snap hips forward, bell floats to chest height. Power from hips, not arms. Don't squat it, hinge it.",
        sets: "3",
        reps: "15",
      },
      {
        name: "Dead Bug",
        detail:
          "On back, arms up, knees at 90. Extend opposite arm and leg slowly, keep lower back pressed into floor. Deep core stability.",
        sets: "3",
        reps: "8 each side",
      },
      {
        name: "Plank",
        detail:
          "On elbows. Straight line head to heels. Squeeze everything. Go longer if 45 sec is easy.",
        sets: "2",
        reps: "30-45 sec",
      },
    ],
    notes: "Rest 30-60 sec between sets. Kettlebell swings are the most important exercise here — learn the hip hinge well.",
  },
  {
    id: "strength-minimal",
    name: "Strength C: Full Body Minimal",
    description: "Four exercises, hits everything. For low-energy days.",
    durationMinutes: 14,
    exercises: [
      {
        name: "Kettlebell Goblet Squat",
        detail: "Hold KB at chest. Squat deep, controlled. Full depth.",
        sets: "3",
        reps: "10",
      },
      {
        name: "Push-ups",
        detail: "Full range. Chest to floor, full lockout.",
        sets: "3",
        reps: "max",
      },
      {
        name: "Kettlebell Swing",
        detail: "Hip hinge, snap forward. Power from hips.",
        sets: "3",
        reps: "15",
      },
      {
        name: "Plank",
        detail: "On elbows. Straight line. Squeeze.",
        sets: "2",
        reps: "30-45 sec",
      },
    ],
    notes: "This is the 'something is better than nothing' workout. 12-15 minutes, no excuses.",
  },
  {
    id: "cardio-run",
    name: "Easy Run",
    description: "20-30 min at conversational pace. Walk uphills if needed.",
    durationMinutes: 25,
    exercises: [
      {
        name: "Run",
        detail:
          "Conversational pace — you should be able to talk in full sentences. If you're gasping, slow down. No distance or pace goal, just time on feet.",
        sets: "1",
        reps: "20-30 min",
      },
    ],
    notes: "Cardiovascular benefit comes from consistency, not intensity. Easy means easy.",
  },
  {
    id: "cardio-bike",
    name: "Easy Bike",
    description: "20-30 min at conversational pace. Lower impact than running.",
    durationMinutes: 25,
    exercises: [
      {
        name: "Bike",
        detail:
          "Conversational pace. Good option when legs are sore from strength work.",
        sets: "1",
        reps: "20-30 min",
      },
    ],
    notes: "Good alternative to running. Same cardiovascular benefit, easier on joints.",
  },
];

export const STRETCH_ROUTINE: Exercise[] = [
  {
    name: "Hip Flexor Stretch",
    detail: "Lunge position, back knee down. Lean forward gently.",
    sets: "1",
    reps: "30 sec each side",
  },
  {
    name: "Hamstring Stretch",
    detail: "Foot on a step or chair. Keep leg straight, lean forward.",
    sets: "1",
    reps: "30 sec each side",
  },
  {
    name: "Chest Doorway Stretch",
    detail: "Arm against door frame at 90 degrees. Lean through the doorway.",
    sets: "1",
    reps: "30 sec",
  },
  {
    name: "Cat-Cow",
    detail: "Hands and knees. Arch spine (cow), then round spine (cat). Slow.",
    sets: "1",
    reps: "10",
  },
  {
    name: "Child's Pose",
    detail: "Sit back on heels, arms extended forward. Breathe.",
    sets: "1",
    reps: "30 sec",
  },
];
