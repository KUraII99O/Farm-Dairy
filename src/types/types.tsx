// src/types/types.ts

export interface Branch {
    id: string;
    name: string;
    setupDate: string;
    builderName: string;
    phoneNumber: string;
    email: string;
  }
  
  export interface BranchTableProps {
    sortedBranches: Branch[];
    handleSort: (fieldName: string) => void;
    sortIcon: (fieldName: string) => JSX.Element;
    handleEditDrawerOpen: (branch: Branch) => void;
    handleDeleteConfirmation: (id: string) => void;
    translate: (key: string) => string;
    formClass: string;
  }
  


  export interface Color {
    id: string;
    name: string;
    userId: string;
  }

  export interface ColorTableProps {
    colors: Color[]; // Use the Color type here
    handleSort: (fieldName: string) => void;
    sortIcon: (fieldName: string) => JSX.Element;
    handleDeleteConfirmation: (id: string) => void;
    handleEditDrawerOpen: (color: Color) => void;
    translate: (key: string) => string;
    formClass: string;
  }
