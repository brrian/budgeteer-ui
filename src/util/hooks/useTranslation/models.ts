export interface Dictionaries {
  [namespace: string]: {
    [key: string]: string;
  };
}

export interface Mappings {
  [key: string]: string;
}

export type Translate = (input: string, mappings?: Mappings) => string;

export interface UseTranslation {
  t: Translate;
}
