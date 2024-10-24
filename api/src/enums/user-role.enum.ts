import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    SITTER = 'sitter',
  }
  
  registerEnumType(UserRole, {
    name: 'roleStatus',
    description: 'El rol de los usuarios.',
  })
  
  