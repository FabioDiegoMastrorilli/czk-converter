export enum PersistentStateDefinitions {
  favorite,
}

export type PersistentStatesKeys = keyof typeof PersistentStateDefinitions;

export const DEFAULT_INITIAL_CZK_AMOUNT = 100;

export const DEFAULT_SELECTED_CURRENCY_ID = "EUR";
