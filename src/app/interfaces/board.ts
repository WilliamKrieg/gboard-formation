import {Column} from './column';

export interface BoardI {
  id?: number;
  name: string;
  columns: Column[];
}

// Exemple de class
/*export class Board implements BoardI {
  id = null;
  name = '';
  columns: Column[] = [];

  constructor(options: BoardI = null) {
    if (options) {
      Object.assign(this, options);
    }
  }
}*/
