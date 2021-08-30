interface User {
  name: string;
  age: number;
  id?: string;
}
interface TableDataProps {
  name: string;
  surname: string;
  position: string;
  occupation: string;
  location: string;
}
interface RowData extends TableDataProps {
  id: number;
}
