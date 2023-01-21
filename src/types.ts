import z from "zod";
import { Timestamp } from "firebase/firestore";
import { DateTime, ToISOTimeOptions } from "luxon";

export type Weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" |
	"Thursday" | "Friday" |
	"Saturday";
export const weekdays: Weekday[] = ["Sunday", "Monday", "Tuesday", "Wednesday",
	"Thursday", "Friday",
	"Saturday"
];

export class TimeBlock {
	startTime: DateTime;
	endTime: DateTime;
	length = 2;

	private constructor([startTime, endTime]: DateTime[]) {
		this.startTime = startTime;
		this.endTime = endTime;
	}

	*[Symbol.iterator]() {
		yield this.startTime;
		yield this.endTime;
	}

	static fromDateTimes(times: DateTime[]) {
		return new TimeBlock(times);
	}

	static fromJsDates([startTime, endTime]: Date[]) {
		return new TimeBlock(
			[DateTime.fromJSDate(startTime), DateTime.fromJSDate(endTime)]
		);
	}

	static fromTimestamp([startTime, endTime]: Timestamp[]) {
		return TimeBlock.fromJsDates(
			[startTime.toDate(), endTime.toDate()]
		);
	}

	toString() {
		// const options: ToISOTimeOptions = {
		// 	suppressSeconds: true,
		// 	suppressMilliseconds: true
		// };

		return `${this.startTime.toString()} - ${this.endTime.toString()}`;
	}

	toJsDates() {
		return [
			this.startTime.toJSDate(),
			this.endTime.toJSDate()
		];
	}

	toTimestamps() {
		return [
			new Timestamp(this.startTime.toSeconds(), 0),
			new Timestamp(this.endTime.toSeconds(), 0)
		];
	}
}
