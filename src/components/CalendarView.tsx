import { Weekday, weekdays } from "../types";
import { sortWeek } from "./CalendarView.lib";
import styles from "./CalendarView.module.scss";

export function CalendarView(props: {
	startDay: Weekday,
	startDate: number, // zero-indexed
	hours: number // zero-indexed
}) {

	const week = sortWeek(props.startDay);
	console.log(week);

	return (
		<div className={styles.Container}>

			<DayColumn weekday="Monday" date={15} hours={12} />
			<DayColumn weekday="Tuesday" date={15} hours={12} />
			<DayColumn weekday="Wednesday" date={15} hours={12} />
			<DayColumn weekday="Thursday" date={15} hours={12} />
			<DayColumn weekday="Friday" date={15} hours={12} />
			<DayColumn weekday="Saturday" date={15} hours={12} />
			<DayColumn weekday="Sunday" date={15} hours={12} />
		</div>
	);
}


function DayColumn(props: {
	weekday: Weekday,
	date: number, // zero-indexed
	hours: number // zero-indexed
}) {

	const divisions = new Array(props.hours)
		.fill(null)
		.map((_, index) => <div key={index} className={styles.Cell}>
			<div className={styles.Subcell}></div>
			<div className={styles.Subcell}></div>
		</div>);

	return (
		<div className={styles.Column}>
			<h3>{props.weekday.slice(0, 3)}</h3>
			<h4>{props.date + 1}</h4>
			{divisions}
		</div>
	);
}
