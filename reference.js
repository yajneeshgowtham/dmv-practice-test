// Study-guide content: symbols/signs and key numbers.
// Written from the California Driver Handbook. Laws change; verify at dmv.ca.gov.
// Symbols: [shape, fill, stroke, name, meaning]  (shape drawn by shapeSvg() in app.js)
// Numbers: [label, value]
window.REFERENCE = {
  symbols: [
    { title: "Sign shapes & colors", items: [
      ["octagon", "#cf222e", "#fff", "Octagon (red)", "STOP. Come to a full stop at the limit line or crosswalk."],
      ["triangle-down", "#fff", "#cf222e", "Inverted triangle", "YIELD. Slow down and give the right-of-way."],
      ["pennant", "#f5c518", "#1b2430", "Pennant (yellow)", "No passing zone. Found on the left side of the road."],
      ["circle", "#f5c518", "#1b2430", "Round (yellow)", "Railroad crossing ahead."],
      ["pentagon", "#c8e61a", "#1b2430", "Pentagon (yellow-green)", "School zone or school crossing ahead."],
      ["diamond", "#f5c518", "#1b2430", "Diamond (yellow)", "Warning of a hazard or condition ahead."],
      ["diamond", "#f28c28", "#1b2430", "Diamond (orange)", "Construction or road work zone."],
      ["rect", "#fff", "#1b2430", "Rectangle (white)", "Regulatory sign, such as speed limit. Follow it by law."],
      ["rect", "#1a7f37", "#fff", "Rectangle (green)", "Guide sign: directions, distances, exits."],
      ["rect", "#1f6feb", "#fff", "Rectangle (blue)", "Services: gas, food, lodging, hospital."],
      ["rect", "#8b5a2b", "#fff", "Rectangle (brown)", "Recreation and cultural areas."]
    ]},
    { title: "Pavement markings", items: [
      ["line-yellow-double", "", "", "Double solid yellow", "Two-way traffic. No passing in either direction."],
      ["line-yellow-broken", "", "", "Broken yellow (your side)", "You may pass if it is safe."],
      ["line-yellow-mixed", "", "", "Solid + broken yellow", "Pass only if the broken line is on your side."],
      ["line-white-solid", "", "", "Solid white", "Lane edge or same-direction lanes. Don't change lanes."],
      ["line-white-broken", "", "", "Broken white", "Separates same-direction lanes. You may change lanes."],
      ["diamond-outline", "", "", "White diamond", "Carpool/HOV or other special-use lane."],
      ["rect", "#fff", "#1b2430", "Crosswalk / limit line", "Stop before the white line at a stop sign or signal."]
    ]},
    { title: "Curb colors", items: [
      ["curb", "#cf222e", "", "Red", "No stopping, standing, or parking. Buses may stop at marked bus zones."],
      ["curb", "#ffffff", "#1b2430", "White", "Passenger loading or mail pickup only, for a limited time."],
      ["curb", "#1a7f37", "", "Green", "Short-term parking, up to the posted time."],
      ["curb", "#1f6feb", "", "Blue", "Disabled persons with a placard or plates only."],
      ["curb", "#f5c518", "", "Yellow", "Loading or unloading passengers or freight."]
    ]},
    { title: "Traffic signals", items: [
      ["circle", "#cf222e", "#1b2430", "Solid red", "Stop. Right turn on red allowed after a full stop unless signed otherwise."],
      ["circle", "#f5c518", "#1b2430", "Solid yellow", "Light is about to turn red. Stop if you can do so safely."],
      ["circle", "#1a7f37", "#1b2430", "Solid green", "Go, after yielding to vehicles and pedestrians still in the intersection."],
      ["circle", "#cf222e", "#1b2430", "Flashing red", "Treat it like a stop sign."],
      ["circle", "#f5c518", "#1b2430", "Flashing yellow", "Proceed with caution."],
      ["arrow", "#1a7f37", "#1b2430", "Green arrow", "Protected turn in the arrow direction. Yield to pedestrians."],
      ["arrow", "#cf222e", "#1b2430", "Red arrow", "Do not turn in that direction until the arrow changes."]
    ]}
  ],
  numbers: [
    { title: "Alcohol & drugs", items: [
      ["BAC limit, age 21 or older", "0.08%"],
      ["BAC limit, commercial drivers", "0.04%"],
      ["BAC limit, under 21 (zero tolerance)", "0.01%"],
      ["BAC limit, on DUI probation (any age)", "0.01%"],
      ["BAC limit, driving passengers for hire", "0.04%"],
      ["Under 21 roadside PAS test reading that allows a breath or blood test", "0.05%"]
    ]},
    { title: "Ages & licensing", items: [
      ["Earliest age for instruction permit", "15½"],
      ["Minimum time holding a permit before the driving test", "6 months"],
      ["Supervised practice required", "50 hours (10 at night)"],
      ["Driver education (classroom)", "30 hours"],
      ["Professional behind-the-wheel training", "6 hours"],
      ["Provisional (under 18): no driving for the first 12 months", "11 PM - 5 AM"],
      ["Provisional: no passengers under 20 unless a licensed driver is aboard, age", "25 or older"],
      ["Minors and cell phones", "No calls or texts (emergency calls allowed)"],
      ["Minor with 2 at-fault incidents", "No driving for 30 days unless with a licensed adult 25+"],
      ["Minor with 3 at-fault incidents", "6-month suspension, 1 year probation"]
    ]},
    { title: "Speed limits", items: [
      ["Business or residential district (no sign)", "25 mph"],
      ["Within 500 ft of a school, children outside or crossing", "25 mph (some posted 15)"],
      ["Blind intersection or alley", "15 mph"],
      ["Within 100 ft of a railroad crossing, can't see tracks for 400 ft", "15 mph"],
      ["Passing a stopped bus, streetcar, or trolley", "10 mph"],
      ["Maximum on most highways", "65 mph"],
      ["Two-lane undivided highway, or towing a trailer", "55 mph"]
    ]},
    { title: "Distances & gaps", items: [
      ["Following distance, good conditions", "3 seconds"],
      ["Signal before a turn", "100 feet"],
      ["Signal before a freeway lane change", "5 seconds"],
      ["Park from a fire hydrant", "15 feet"],
      ["Stop from the nearest railroad track", "15 feet"],
      ["Park from a curb", "Within 18 inches"],
      ["Park from a marked or unmarked crosswalk", "Not within 20 feet"],
      ["Park from a disabled-access sidewalk ramp", "Not within 3 feet"],
      ["Passing a bicycle", "3 feet clearance"],
      ["Do not pass within this distance of an intersection, bridge, tunnel, or railroad crossing", "100 feet"],
      ["Driving in a center left-turn lane", "No more than 200 feet"],
      ["Scan ahead while driving", "At least 10 seconds"],
      ["Stopping distance at 55 mph, passenger car", "About 300 feet"],
      ["Dim high beams for oncoming traffic", "500 feet"],
      ["Dim high beams when following another car", "300 feet"],
      ["Headlights required when you can't see from", "1,000 feet"],
      ["Headlights required from", "30 min after sunset to 30 min before sunrise"]
    ]},
    { title: "Child safety seats", items: [
      ["Under 2 years, under 40 lbs, and under 3'4\"", "Rear-facing seat"],
      ["Under 8 years, or under 4'9\"", "Child seat in the back seat"],
      ["Age 8+, or at least 4'9\"", "Seat belt"],
      ["Sit at least this far from the airbag cover", "10 inches"],
      ["Leaving a child this age or younger alone in a car is illegal without a supervisor 12+", "6 years"]
    ]},
    { title: "Points, violations & reporting", items: [
      ["Suspension/probation (Level III) at points in 12 months", "4"],
      ["Suspension/probation (Level III) at points in 24 months", "6"],
      ["Suspension/probation (Level III) at points in 36 months", "8"],
      ["Warning letter (Level I) at points in 12 / 24 / 36 months", "2 / 4 / 6"],
      ["Notice of intent to suspend (Level II) at points in 12 / 24 / 36 months", "3 / 5 / 7"],
      ["Level III penalty", "1 year probation with a 6-month suspension"],
      ["Points for safe-operation violations such as speeding", "1"],
      ["Points for a collision you are responsible for", "1"],
      ["Points for DUI or hit and run", "2"],
      ["Traffic violator school for a 1-point violation", "Once in any 18-month period"],
      ["Report address change to DMV within", "10 days"],
      ["Report a collision to DMV within", "10 days (injury, death, or over $1,000 damage)"],
      ["Minimum liability insurance (since Jan 2025)", "$30,000 / $60,000 / $15,000"],
      ["Minimum tire tread depth (DMV drive test pre-check)", "1/32 inch"]
    ]}
  ]
};
