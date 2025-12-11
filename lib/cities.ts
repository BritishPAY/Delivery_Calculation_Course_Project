export const KAZAKHSTAN_CITIES = [
  "Almaty",
  "Astana",
  "Shymkent",
  "Karaganda",
  "Aktobe",
  "Pavlodar",
  "Ust-Kamenogorsk",
  "Semey",
  "Atyrau",
  "Kostanay",
  "Kyzylorda",
  "Petropavl",
  "Taraz",
  "Uralsk",
  "Temirtau",
  "Aktau",
  "Ekibastuz",
  "Zhezkazgan",
  "Stepnogorsk",
  "Turkistan",
] as const

export type City = (typeof KAZAKHSTAN_CITIES)[number]
