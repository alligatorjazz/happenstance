import { DOMAttributes, MouseEventHandler } from "react";
import { number } from "zod";
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
	const updateCell: MouseEventHandler<HTMLDivElement> = () => setDivisions(divisions => {
		console.log("updating subcell at position " + position);
		return divisions.map(
			(subcell, index) => index == position ? !subcell : subcell
		);
	});

	const updateCellIfMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
		if (e.buttons == 1) {
			updateCell(e);
		}
	};

	return {
		onClick: updateCell,
		onMouseEnter: updateCellIfMouseDown
	};
}

// TODO: implement
// export function exportBlocks(date: Date, { divisions }: CalendarState) {

// }

export function to12Hour(hour: number) {
	const meridian = hour >= 12 ? "pm" : "am"; 
	return `${(hour % 12) || 12}${meridian}`;
}