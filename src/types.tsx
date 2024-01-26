export interface Planet {
  id: string;
  name: string;
  filmConnection: {
    films: {
      id: string;
      title: string;
    }[];
  };
}

export interface Starships {
    id: string;
    name: string;
    filmConnection: {
      films: {
        id: string;
        title: string;
      }[];
    };
  }
  
