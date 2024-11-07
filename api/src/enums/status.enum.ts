import { registerEnumType } from "@nestjs/graphql";

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
registerEnumType(Status, {
  name: 'Status',
});