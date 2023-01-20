import { createContext, useContext, useState } from "react";
import { TimeBlock, Weekday, weekdays } from "../types";
import { bindCell, CalendarState, sortWeek } from "./CalendarView.lib";
import styles from "./CalendarView.module.scss";

const CalendarContext = createContext<CalendarState | null>(null);
export function CalendarView(props: {
	startDay: Weekday,
	startDate: number, // zero-indexed
	hours: number // zero-indexed
}) {
	const [divisions, setDivisions] = useState<boolean[]>(
		new Array(7 * props.hours * 2).fill(false)
	);

	const week = sortWeek(props.startDay);
	console.log(week);

	return (
		<CalendarContext.Provider value={{ divisions, setDivisions }}>
			<div className={styles.Container}>
				{week.map((weekday, index) =>
					<DayColumn
						key={index}
						weekIndex={index}
						weekday={weekday}
						date={props.startDate + index}
						hours={props.hours}
					/>
				)}
			</div>
		</CalendarContext.Provider>
	);
}

function DayColumn(props: {
	weekday: Weekday,
	weekIndex: number,
	date: number, // zero-indexed
	hours: number // zero-indexed
}) {
	const state = useContext(CalendarContext);
	if (!state) { return null; }
	const subcells = new Array(props.hours)
		.fill(null)
		.map((_, hour) => {
			const cellLocation = (props.weekIndex * props.hours * 2) + (hour * 2);
			return <div key={hour} className={styles.Cell}>
				<div {...bindCell(state, cellLocation)} className={
					`${styles.Subcell} ${state.divisions[cellLocation] ? styles.Active : ""}`
				}>{cellLocation}</div>
				<div {...bindCell(state, cellLocation + 1)} className={
					`${styles.Subcell} ${state.divisions[cellLocation + 1] ? styles.Active : ""}`
				}>{cellLocation + 1}</div>
			</div>;
		});

	return (
		<div className={styles.Column}>
			<h3>{props.weekday.slice(0, 3)} {props.weekIndex}</h3>
			<h4>{props.date + 1}</h4>
			{subcells}
		</div>
	);
}
