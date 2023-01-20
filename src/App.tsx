import styles from "./App.module.scss";
import { CalendarView } from "./components/CalendarView";

function App() {

	return (
		<div className={styles.Container}>
			<h1>App Test</h1>
			<CalendarView startDay="Sunday" startDate={15} hours={12}/>
		</div>
	);
}

export default App;
