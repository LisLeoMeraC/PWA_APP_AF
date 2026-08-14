// src/app/models/page.ts
export interface Page<T> {
   content: T[]; // Lista de elementos (en este caso, productos)
   pageable: {
     pageNumber: number;
     pageSize: number;
     sort: {
       sorted: boolean;
       unsorted: boolean;
       empty: boolean;
     };
     offset: number;
     paged: boolean;
     unpaged: boolean;
   };
   totalPages: number; // Total de páginas
   totalElements: number; // Total de elementos
   last: boolean; // Si es la última página
   size: number; // Tamaño de la página
   number: number; // Número de la página actual
   sort: {
     sorted: boolean;
     unsorted: boolean;
     empty: boolean;
   };
   numberOfElements: number; // Número de elementos en la página actual
   first: boolean; // Si es la primera página
   empty: boolean; // Si la página está vacía
 }