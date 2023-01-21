import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { DOMAttributes, MouseEventHandler } from "react";
import { TimeBlock, Weekday, weekdays } from "../types";

export const minutesPerDivision = 30;

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

export function exportBlocks(date: Date, divisions: boolean[]): TimeBlock[] {
	const referenceDate: DateTime = DateTime
		.fromISO(date.toISOString().slice(0, 10));

	// loops through divisions, tabulates the continous blocks of available time,
	// and returns them all as an array of TimeBlocks.
	const times = divisions.map((_, index) => {
		return referenceDate.plus({ minutes: 30 * index });
	});

	const timeBlocks: TimeBlock[] = [];
	let queuedBlock: DateTime[] = [];
	for (let i = 0; i < divisions.length; i++) {
		if (divisions[i] == true && queuedBlock.length == 0) {
			queuedBlock.push(times[i]);
		}

		if (divisions[i] == false && queuedBlock.length == 1) {
			queuedBlock.push(times[i]);
		}

		if (queuedBlock.length == 2) {
			timeBlocks.push(TimeBlock.fromDateTimes(queuedBlock));
			queuedBlock = [];
		}
	}
	
	console.log(timeBlocks.map(block => block.toString()));
	return timeBlocks;
}

export function to12Hour(hour: number) {
	const meridian = hour >= 12 ? "pm" : "am";
	return `${(hour % 12) || 12}${meridian}`;
}