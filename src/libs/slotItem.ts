export interface ISelectedSlotItem {
  id: number;
  slot: string;
  dec: string;
}

export interface ICreatedTimeItem {
  id: number;
  slot: string;
}

export const selectedSlotItem = [
  {
    id: 0,
    slot: "",
    dec: "선택"
  },
  {
    id: 1,
    slot: "공복",
    dec: "공복"
  },
  {
    id: 2,
    slot: "아침 식전",
    dec: "아침 식전"
  },
  {
    id: 3,
    slot: "아침 식후",
    dec: "아침 식후"
  },
  {
    id: 4,
    slot: "점심 식전",
    dec: "점심 식전"
  },
  {
    id: 5,
    slot: "점심 식후",
    dec: "점심 식후"
  },
  {
    id: 6,
    slot: "저녁 식전",
    dec: "저녁 식전"
  },
  {
    id: 7,
    slot: "저녁 식후",
    dec: "저녁 식후"
  }
];

export const createdTimeItem = [
  {
    id: 0,
    slot: "선택"
  },
  {
    id: 1,
    slot: "아침"
  },
  {
    id: 2,
    slot: "점심"
  },
  {
    id: 3,
    slot: "저녁"
  }
];
