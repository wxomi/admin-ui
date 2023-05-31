import React, { createContext } from "react";
import Member from "../interfaces/Member";

interface AppContextValue {
  editRowId: number;
  setEditRowId: React.Dispatch<React.SetStateAction<number>>;
  setMembers: React.Dispatch<React.SetStateAction<Array<Member>>>;
  members: Array<Member>;
  handleDelete: (id: number) => void;
  setSelectedRows: React.Dispatch<React.SetStateAction<Array<number>>>;
  searchTerm: string;
  setfilteredMembers: React.Dispatch<React.SetStateAction<Array<Member>>>;
  selectedRows: Array<number>;
}

export const AppContext = createContext<AppContextValue | null>(null);

// export const AppProvider: React.FC<React.PropsWithChildren> = ({
//   children,
// }) => {

//   return (
//     <AppContext.Provider value={{ editRowId, setEditRowId }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
