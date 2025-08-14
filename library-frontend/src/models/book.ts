export interface Book {
  id: number;                 
  title: string;
  author: string;
  published_year: number | null; 
  isbn: string;
  pages: number | null;        
}

export interface BookCreateUpdateDTO {
  title: string;
  author: string;
  published_year: number;      
  isbn: string;
  pages: number;         
}
