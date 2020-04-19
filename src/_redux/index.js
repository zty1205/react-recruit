import App from './app'
import {Provider} from './react-redux'
import { counter, createStore } from './redux.js'
import {applyMiddleware} from './react-redux'
import chunk, {arrayThunk} from './redux-chunk'

const store = createStore(counter, applyMiddleware(chunk, arrayThunk))

ReactDom.render(
	(
		<Provider store={store}>
			<App></App>
		</Provider>
	),
	document.getElementById('root')
)