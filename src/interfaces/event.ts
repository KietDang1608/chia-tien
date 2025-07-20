import { Member } from "./member";
export interface Event {
    id: number;
    name: string;
    date: string; // ISO date string
    members: Member[]; // List of members participating in the event
}