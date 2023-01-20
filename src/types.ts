import z from "zod";
import { Timestamp } from "firebase/firestore";

export type Weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" |
	"Thursday" | "Friday" |
	"Saturday";
export const weekdays: Weekday[] = ["Sunday", "Monday", "Tuesday", "Wednesday",
	"Thursday", "Friday",
	"Saturday"
];

export const TimeBlockSchema = z.array(
	z.array(z.instanceof(Timestamp)).max(2)
);

export type TimeBlock = z.infer<typeof TimeBlockSchema>;
