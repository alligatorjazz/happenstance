import styles from "./App.module.scss";
import { CalendarView } from "./components/CalendarView";

function App() {

	return (
		<div className={styles.Container}>
			<h1>App Test</h1>
			<CalendarView beginDate={new Date(Date.now())} hours={12}/>
		</div>
	);
}

export default App;
