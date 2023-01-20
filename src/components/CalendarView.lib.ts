import { DOMAttributes } from "react";
import { TimeBlock, Weekday, weekdays } from "../types";

export type CalendarState = {
	divisions: boolean[],
	setDivisions: React.Dispatch<React.SetStateAction<boolean[]>>
}

export function sortWeek(startDay: Weekday) {
	const startIndex = weekdays.indexOf(startDay);
	return weekdays
		.slice(startIndex)
		.concat(weekdays.slice(0, startIndex));
}

export function bindCell({ setDivisions }: CalendarState, position: number): DOMAttributes<HTMLDivElement> {
	// loops through divisions, finds the value at divisions[position], switches it, then returns a new array
	const updateCell = () => setDivisions(divisions => {
		console.log("updating subcell at position " + position);
		return divisions.map(
			(subcell, index) => index == position ? !subcell : subcell
		);
	}
	);



	return {
		onClick: updateCell
	};
}