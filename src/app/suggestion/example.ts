export interface Exmaple {
  text: string;
  label: Label;
  similar: {
    label: Label;
    text: string;
    score: number;
  }[];
}

export interface Label {
  name: string;
  idx: number;
}
