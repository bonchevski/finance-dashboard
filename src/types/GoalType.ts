import { Priority, GoalStatus } from "./common";

export type Goal = {
  id: string;
  title: string;
  note: string;
  priority: Priority;
  dependsOn?: string; // id of another goal
  dateCreated: Date;
  dueDate: Date;
  lastUpdated: Date;
  status: GoalStatus;
};
