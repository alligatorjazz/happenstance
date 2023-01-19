import { Weekday, weekdays } from "../types";

export function sortWeek(startDay: Weekday) {
	const startIndex = weekdays.indexOf(startDay);
	return weekdays
		.slice(startIndex)
		.concat(weekdays.slice(0, startIndex));
}