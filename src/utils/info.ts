//NIH

type InfoType = {
  information: string;
  sources: string[];
};
export const INFO: Record<number, InfoType> = {
  1106: {
    //Vitamin A
    information:
      "Vitamin A is a group of fat-soluble retinoids, primarily retinol and retinyl esters. It supports immune function, cellular communication, growth and development, reproduction, organ formation, and vision. Vitamin A is also essential for rhodopsin, a light-sensitive protein in the retina, and helps maintain the normal function of the conjunctival membranes and cornea.",
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
      "Vitamin D helps the body absorb calcium and maintain healthy calcium and phosphate levels, which are needed for strong bones. It supports bone growth and remodeling, helps prevent rickets in children and osteomalacia in adults, and works with calcium to help protect older adults from osteoporosis.",
    sources: [
      "flesh of fatty fish",
      "sunlight exposure",
      "dietary supplements",
    ],
  },
  1162: {
    information:
      "Vitamin C supports collagen production, wound healing, immune function, antioxidant protection, and protein metabolism. It also helps the body absorb nonheme iron from plant-based foods. Low vitamin C intake can lead to scurvy, which causes fatigue, weakened connective tissue, and fragile capillaries.",
    sources: ["red pepper, orange, grapefruit, kiwi, green pepper"],
  },
  1165: {
    // THIAMIN
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
  1166: {
    // Riboflavin
    information:
      "his vitamin is an essential component of two major coenzymes, flavin mononucleotide (FMN; also known as riboflavin-5’-phosphate) and flavin adenine dinucleotide (FAD). These coenzymes play major roles in energy production; cellular function, growth, and development; and metabolism of fats, drugs, and steroids",
    sources: [
      "beef liver",
      "breakfast cereals",
      "oats",
      "yogurt",
      "milk 2% fat",
    ],
  },
  1167: {
    //Niacin
    information:
      "All tissues in the body convert absorbed niacin into its main metabolically active form, the coenzyme nicotinamide adenine dinucleotide (NAD). More than 400 enzymes require NAD to catalyze reactions in the body, which is more than for any other vitamin-derived coenzyme. NAD is also converted into another active form, the coenzyme nicotinamide adenine dinucleotide phosphate (NADP), in all tissues except skeletal muscle. NAD and NADP are required in most metabolic redox processes in cells where substrates are oxidized or reduced. NAD is primarily involved in catabolic reactions that transfer the potential energy in carbohydrates, fats, and proteins to adenosine triphosphate (ATP), the cell’s primary energy currency. NAD is also required for enzymes involved in critical cellular functions, such as the maintenance of genome integrity, control of gene expression, and cellular communication. NADP, in contrast, enables anabolic reactions, such as the synthesis of cholesterol and fatty acids, and plays a critical role in maintaining cellular antioxidant function.",
    sources: ["beef liver", "chicken breast", "marinara", "turkey breast"],
  },
  1170: {
    //Pantothenic Acid
    information:
      "The main function of this water-soluble B vitamin is in the synthesis of coenzyme A (CoA) and acyl carrier protein. CoA is essential for fatty acid synthesis and degradation, transfer of acetyl and acyl groups, and a multitude of other anabolic and catabolic processes. Acyl carrier protein’s main role is in fatty acid synthesis.",
    sources: [
      "beef liver",
      "breakfast cereals (fortified)",
      "shitake mushrooms",
      "sunflower seeds",
      "chicken breast",
    ],
  },
  1175: {
    //B6
    information:
      "Extremely versatile with involvement in more than 100 enzyme reactions, mostly concerned with protein metabolism. Vitamin B6 also plays a role in cognitive development through the biosynthesis of neurotransmitters and in maintaining normal levels of homocysteine, an amino acid in the blood. Vitamin B6 is involved in gluconeogenesis and glycogenolysis, immune function (for example, it promotes lymphocyte and interleukin-2 production), and hemoglobin formation.",
    sources: [
      "chickpeas",
      "beef liver",
      "tuna, fresh cooked",
      "salmon, sockeye",
      "chicken breast",
    ],
  },
  1176: {
    //Biotin
    information:
      "This water-soluble vitamin is a cofactor for five carboxylases (propionyl-CoA carboxylase, pyruvate carboxylase, methylcrotonyl-CoA carboxylase [MCC], acetyl-CoA carboxylase 1, and acetyl-CoA carboxylase 2) that catalyze critical steps in the metabolism of fatty acids, glucose, and amino acids. Biotin also plays key roles in histone modifications, gene regulation (by modifying the activity of transcription factors), and cell signaling.",
    sources: [
      "beef liver",
      "egg",
      "salmon, pink",
      "pork chops",
      "hamburger patty",
    ],
  },
  1177: {
    //Folate / B9
    information:
      "Folate, formerly known as folacin and sometimes vitamin B9, is the generic term for naturally occurring food folates and folates in dietary supplements and fortified foods, including folic acid. Food folates are in the tetrahydrofolate (THF) form and usually have additional glutamate residues, making them polyglutamates [1]. Folic acid is the fully oxidized monoglutamate form of the vitamin that is used in fortified foods and most dietary supplements. Some dietary supplements also contain folate in the monoglutamyl form, 5-MTHF (also known as L-5-MTHF, 5-methyl-folate, L-methylfolate, and methylfolate).\n Folate functions as a coenzyme or cosubstrate in single-carbon transfers in the synthesis of nucleic acids (DNA and RNA) and metabolism of amino acids [1-3]. One of the most important folate-dependent reactions is the conversion of homocysteine to methionine in the synthesis of S-adenosyl-methionine, an important methyl donor. Another folate-dependent reaction, the methylation of deoxyuridylate to thymidylate in the formation of DNA, is required for proper cell division. An impairment of this reaction initiates a process that can lead to megaloblastic anemia, one of the hallmarks of folate deficiency [4].",
    sources: [
      "beef liver",
      "spinach",
      "black eyed peas",
      "fortified breakfast cereals",
      "fortified pasta",
    ],
  },
  1178: {
    //B12
    information:
      "Vitamin B12 is a water-soluble vitamin that is naturally present in some foods, added to others, and available as a dietary supplement and a prescription medication. Because vitamin B12 contains the mineral cobalt, compounds with vitamin B12 activity are collectively called cobalamins [1]. Methylcobalamin and 5-deoxyadenosylcobalamin are the metabolically active forms of vitamin B12. However, two others forms, hydroxycobalamin and cyanocobalamin, become biologically active after they are converted to methylcobalamin or 5-deoxyadenosylcobalamin [1-3].",
    sources: ["beef liver", "Clams", "Oysters", "Nutritional Yeast", "Salmon"],
  },
  1180: {
    //Choline
    information:
      "Choline is an essential nutrient that is naturally present in some foods and available as a dietary supplement. Choline is a source of methyl groups needed for many steps in metabolism. The body needs choline to synthesize phosphatidylcholine and sphingomyelin, two major phospholipids vital for cell membranes. Therefore, all plant and animal cells need choline to preserve their structural integrity [1,2]. In addition, choline is needed to produce acetylcholine, an important neurotransmitter for memory, mood, muscle control, and other brain and nervous system functions [1-3]. Choline also plays important roles in modulating gene expression, cell membrane signaling, lipid transport and metabolism, and early brain development",
    sources: ["beef liver", "egg", "soybeans", "chicken breast", "cod"],
  },
  1185: {
    //Vitamin K
    information:
      "Vitamin K, the generic name for a family of compounds with a common chemical structure of 2-methyl-1,4-naphthoquinone, is a fat-soluble vitamin that is naturally present in some foods and is available as a dietary supplement [1]. These compounds include phylloquinone (vitamin K1) and a series of menaquinones (vitamin K2) [2]. Menaquinones have unsaturated isoprenyl side chains and are designated as MK-4 through MK-13, based on the length of their side chain [1,2]. MK-4, MK-7, and MK-9 are the most well-studied menaquinones.",
    sources: ["Natto", "Collards", "turnip greens", "spinach", "kale"],
  },
  1109: {
    //Vitamin E
    information:
      "Vitamin E is found naturally in some foods, added to others, and available as a dietary supplement. Vitamin E is the collective name for a group of fat-soluble compounds with distinctive antioxidant activities [1].Naturally occurring vitamin E exists in eight chemical forms (alpha-, beta-, gamma-, and delta-tocopherol and alpha-, beta-, gamma-, and delta-tocotrienol) that have varying levels of biological activity [1]. Alpha- (or α-) tocopherol is the only form that is recognized to meet human requirements.",
    sources: [
      "wheat germ oil",
      "sunflower seeds",
      "almonds",
      "sunflower oil",
      "hazelnuts",
    ],
  },
};
