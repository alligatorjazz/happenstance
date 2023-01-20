import z from "zod";
import { Timestamp } from "firebase/firestore";

export type Weekday = "Monday" | "Tuesday" | "Wednesday" |
	"Thursday" | "Friday" |
	"Saturday" | "Sunday";
export const weekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday",
	"Thursday", "Friday",
	"Saturday", "Sunday"];

export const TimeBlockSchema = z.array(
	z.array(z.instanceof(Timestamp)).max(2)
);

export type TimeBlock = z.infer<typeof TimeBlockSchema>;
