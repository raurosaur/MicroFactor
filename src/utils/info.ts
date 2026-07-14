//NIH

type InfoType = {
  information: string;
  sources: string[];
};
export const INFO: Record<number, InfoType> = {
  1106: {
    //Vitamin A
    information:
      "Vitamin A is the name of a group of fat-soluble retinoids,\
       primarily retinol and retinyl esters.\
        Vitamin A is involved in immune function, cellular communication, \
        growth and development, and male and female reproduction. Vitamin A \
        supports cell growth and differentiation, playing a critical role \
        in the normal formation and maintenance of the heart, lungs, eyes,\
         and other organs. Vitamin A is also critical for vision as \
         an essential component of rhodopsin, the light-sensitive protein in\
        the retina that responds to light entering the eye, and because it\
         supports the normal differentiation and functioning of the \
           conjunctival membranes and cornea ",
    sources: [
      "beef liver",
      "sweet potato",
      "spinach",
      "pumpkin pie",
      "carrots",
    ],
  },
  1114: {
    information:
      "Vitamin D promotes calcium absorption in the gut and maintains adequate serum calcium and phosphate concentrations to enable normal bone mineralization and to prevent hypocalcemic tetany (involuntary contraction of muscles, leading to cramps and spasms). It is also needed for bone growth and bone remodeling by osteoblasts and osteoclasts. Without sufficient vitamin D, bones can become thin, brittle, or misshapen. Vitamin D sufficiency prevents rickets in children and osteomalacia in adults. Together with calcium, vitamin D also helps protect older adults from osteoporosis.",
    sources: [
      "flesh of fatty fish",
      "sunlight exposure",
      "dietary supplements",
    ],
  },
  1162: {
    information:
      "Vitamin C is required for the biosynthesis of collagen, L-carnitine, and certain neurotransmitters; vitamin C is also involved in protein metabolism [1,2]. Collagen is an essential component of connective tissue, which plays a vital role in wound healing. Vitamin C is also an important physiological antioxidant [3] and has been shown to regenerate other antioxidants within the body, including alpha-tocopherol (vitamin E) [4]. Because vitamin C can limit the damaging effects of free radicals through its antioxidant activity, researchers are examining whether it might help prevent or delay the development of diseases in which oxidative stress plays a role, such as certain cancers and cardiovascular disease (CVD). In addition to its biosynthetic and antioxidant functions, vitamin C plays an important role in immune function [4] and improves the absorption of nonheme iron [5], the form of iron that is present in plant-based foods. Insufficient vitamin C intake causes scurvy, which is characterized by fatigue or lassitude, widespread connective tissue weakness, and capillary fragility ",
    sources: ["red pepper, orange, grapefruit, kiwi, green pepper"],
  },
  1165: {
    information:
      "This vitamin plays a critical role in energy metabolism and, therefore, in the growth, development, and function of cells",
    sources: [
      "breakfast cereal",
      "egg noodles",
      "pork chop",
      "trout",
      "black beans",
    ],
  },
};
