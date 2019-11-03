const spotsModel = [
  {
    surrounding: [-12, -11, -1, 1, 12, 13],
    spotRanges: [
      {min: 13, max: 22},
      {min: 37, max: 46},
      {min: 61, max: 70},
      {min: 85, max: 94}
    ]
  },
  {
    surrounding: [-13, -12, -1, 1, 11, 12],
    spotRanges: [
      {min: 25, max: 34},
      {min: 49, max: 58},
      {min: 73, max: 82},
      {min: 97, max: 106}
    ]
  },
  {
    surrounding: [-1, 1, 11, 12],
    spotRanges: [
      {min: 1, max: 10}
    ]
  },
  {
    surrounding: [-11, -12, -1, 1],
    spotRanges: [
      {min: 109, max: 118}
    ]
  },
  {
    surrounding: [-12, -11, 1, 12, 13],
    spots: [12, 36, 60, 84]
  },
  {
    surrounding: [-12, 1, 12],
    spots: [24, 48, 72, 96]
  },
  {
    surrounding: [-12, -1, 12],
    spots: [23, 47, 71, 95]
  },
  {
    surrounding: [-13, -12, -1, 11, 12],
    spots: [35, 59, 83, 107]
  },
  {
    surrounding: [1, 12],
    spots: [0]
  },
  {
    surrounding: [-1, 11, 12],
    spots: [11]
  },
  {
    surrounding: [-12, -11, 1],
    spots: [108]
  },
  {
    surrounding: [-12, -1],
    spots: [119]
  }
]

export default spotsModel