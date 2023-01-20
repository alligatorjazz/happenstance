import { createContext, useContext, useState } from "react";
import { Weekday, weekdays } from "../types";
import { bindCell, CalendarState, sortWeek, to12Hour } from "./CalendarView.lib";
import styles from "./CalendarView.module.scss";

const CalendarContext = createContext<CalendarState | null>(null);
export function CalendarView({ beginDate, hours }: {
	beginDate: Date,
	hours: number // zero-indexed
}) {
	const [divisions, setDivisions] = useState<boolean[]>(
		new Array(7 * hours * 2).fill(false)
	);

	const start = {
		dayOfMonth: beginDate.getDate(),
		dayOfWeek: weekdays[beginDate.getDay()]
	};

	const week = sortWeek(start.dayOfWeek);

	return (
		<CalendarContext.Provider value={{ divisions, setDivisions }}>
			<div className={styles.Container}>
				<TimeColumn date={beginDate} hours={hours}/>
				{week.map((weekday, index) =>
					<DayColumn
						key={index}
						weekIndex={index}
						weekday={weekday}
						date={start.dayOfMonth + index}
						hours={hours}
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
	const subcells = [...Array(props.hours).keys()]
		.map((_, hour) => {
			
			const cellLocation = (props.weekIndex * props.hours * 2) + (hour * 2);
			return <div key={hour} className={styles.Cell}>
				<div {...bindCell(state, cellLocation)} className={
					`${styles.Subcell} ${state.divisions[cellLocation] ? styles.Active : ""}`
				}></div>
				<div {...bindCell(state, cellLocation + 1)} className={
					`${styles.Subcell} ${state.divisions[cellLocation + 1] ? styles.Active : ""}`
				}></div>
			</div>;
		});

	return (
		<div className={styles.Column}>
			<h3>{props.weekday.slice(0, 3)} {props.weekIndex}</h3>
			<h4>{props.date}</h4>
			{subcells}
		</div>
	);
}

function TimeColumn({ date, hours }: { date: Date, hours: number }) {
	const timeCells = [...Array(hours).keys()].map(offset => {
		return <div className={styles.Cell} key={offset}>{to12Hour(date.getHours() + offset)}</div>;
	});

	return (
		<div className={`${styles.Column} ${styles.TimeColumn}`}>
			<h3>-</h3>
			<h4>-</h4>
			{timeCells}
		</div>
	);
}