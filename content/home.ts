export const photos = {
  heatPump: "1776860150305-108ed577d7d4",
  heatPumpHouse: "1700124113583-81aa99ea2aa2",
  solar: "1624397640148-949b1732bb0a",
  boilerRoom: "1618840626133-54463084a141",
  installer: "1660330589693-99889d60181e",
};

export type SystemSpec = {
  id: string;
  name: string;
  summary: string;
  photo: string;
  photoAlt: string;
  specs: [string, string][];
};

export const systems: SystemSpec[] = [
  {
    id: "heat-pumps",
    name: "Air source heat pumps",
    summary:
      "Pulls heat from outside air, even at minus 20 °C, and moves it into your radiators or underfloor loops. The best fit for most houses built after 1980.",
    photo: photos.heatPump,
    photoAlt: "Outdoor heat pump unit installed next to a brick wall",
    specs: [
      ["Efficiency", "3 to 4.5 kWh of heat per kWh of power"],
      ["Typical size", "6 to 12 kW for a family house"],
      ["Install time", "2 to 3 days"],
      ["Warranty", "10 years on parts and labour"],
    ],
  },
  {
    id: "boilers",
    name: "Condensing boilers",
    summary:
      "A like-for-like swap when a heat pump is not practical yet. Modern condensing units use up to a third less gas than boilers fitted 15 years ago.",
    photo: photos.boilerRoom,
    photoAlt: "Insulated heating pipes and valves in a plant room",
    specs: [
      ["Efficiency", "Up to 94% seasonal"],
      ["Typical size", "18 to 35 kW"],
      ["Install time", "1 day"],
      ["Warranty", "7 years"],
    ],
  },
  {
    id: "solar",
    name: "Rooftop solar",
    summary:
      "Panels sized to what you actually use, with an optional battery so the heat pump runs on your own power in the evening.",
    photo: photos.solar,
    photoAlt: "Installer fitting a black solar panel on a shingled roof",
    specs: [
      ["Output", "About 1,100 kWh per kWp a year"],
      ["Typical size", "4 to 8 kWp"],
      ["Install time", "1 to 2 days"],
      ["Warranty", "25 years on panel output"],
    ],
  },
];

export const steps = [
  {
    title: "Survey",
    text: "An engineer measures every room, checks insulation and radiators, and takes readings from your current system. It takes about two hours.",
  },
  {
    title: "Design",
    text: "You get a heat loss report, a fixed quote and a drawing of where each unit goes. No deposit until you agree to the design.",
  },
  {
    title: "Install",
    text: "One crew from start to finish. We protect floors, remove the old equipment and leave the system running and explained.",
  },
  {
    title: "Service",
    text: "Yearly check-ups and remote monitoring. If output drops, we usually see it before you feel it.",
  },
];

export const projects = [
  { place: "Detached house, Oak Hill", system: "10 kW heat pump", size: "190 m²", result: "Heating bill down 58%" },
  { place: "Terraced house, Millbrook", system: "6 kW heat pump + 4 kWp solar", size: "95 m²", result: "Net bill down 71%" },
  { place: "Bakery, Riverside", system: "28 kW condensing boiler", size: "240 m²", result: "Gas use down 31%" },
  { place: "Bungalow, Westfield", system: "8 kW heat pump", size: "130 m²", result: "Paid back in 9 years" },
];

export const faqs = [
  {
    q: "Will a heat pump work with my old radiators?",
    a: "Often, yes. The survey checks each radiator against the room's heat loss. In most houses we replace two or three of them, not all.",
  },
  {
    q: "How noisy is the outdoor unit?",
    a: "About as loud as a fridge at one metre, and quieter at the boundary. We place it so it meets local noise rules.",
  },
  {
    q: "Do you help with grants?",
    a: "We check which programmes your home qualifies for and fill in the paperwork as part of the quote.",
  },
  {
    q: "What happens if something breaks?",
    a: "Call the service line. During warranty the visit and parts are free, and most faults are fixed on the first visit.",
  },
];
