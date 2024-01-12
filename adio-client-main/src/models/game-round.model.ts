import { Track } from './track.model';

export class GameRound {
    constructor(
      public round_number: number,
      public round_question: string,
      public round_answers: string[],
      public round_answer: string,
      public round_track: Track,
    ) {}
  }