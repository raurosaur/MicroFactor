export type SearchResultFood = {
  /** Unique ID of the food. */
  fdcId: number;

  /** The description of the food. */
  description: string;

  /** The type of the food data. */
  dataType?: string;

  /** A unique ID identifying the food within FNDDS. */
  foodCode?: string;

  foodNutrients?: AbridgedFoodNutrient[];

  /** Date the item was published to FDC. */
  publicationDate?: string;

  /** The scientific name of the food. */
  scientificName?: string;

  /** Brand owner for the food. Only applies to Branded Foods. */
  brandOwner?: string;

  /** GTIN or UPC code identifying the food. Only applies to Branded Foods. */
  gtinUpc?: string;

  /** Ingredient list from product label. Only applies to Branded Foods. */
  ingredients?: string;

  /** Unique number assigned for foundation foods. */
  ndbNumber?: string;

  /** Any additional descriptions of the food. */
  additionalDescriptions?: string;

  /** Highlight fields returned by search. */
  allHighlightFields?: string;

  /** Relative score indicating how well the food matches the search criteria. */
  score?: number;
};

export type AbridgedFoodNutrient = {
  /** USDA nutrient number/id, example: 303 */
  number?: number;

  /** Nutrient name, example: "Iron, Fe" */
  name?: string;

  /** Nutrient amount, example: 0.53 */
  amount?: number;
  value?: number;
  /** Unit, example: "mg" */
  unitName?: string;

  derivationCode?: string;
  derivationDescription?: string;

  /** Allows extra USDA fields without breaking */
  [key: string]: unknown;
};

export type FoodNutrient = {
  derivationCode?: string;
  derivationDescription?: string;
  derivationId?: number;

  foodNutrientId?: number;

  foodNutrientSourceCode?: string;
  foodNutrientSourceDescription?: string;
  foodNutrientSourceId?: number;

  indentLevel?: number;

  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;

  rank?: number;
  unitName: string;

  value: number;

  [key: string]: unknown;
};

export type Nutrient = {
  id?: number;
  number?: string;
  name?: string;
  rank?: number;
  unitName?: string;

  [key: string]: unknown;
};

export type FoodNutrientDerivation = {
  id?: number;
  code?: string;
  description?: string;
  foodNutrientSource?: FoodNutrientSource;

  [key: string]: unknown;
};

export type FoodNutrientSource = {
  id?: number;
  code?: string;
  description?: string;

  [key: string]: unknown;
};

export type NutrientAnalysisDetails = {
  [key: string]: unknown;
};
