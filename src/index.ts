import {runDb} from "./db/db";
import {app, SETTINGS} from "./setting";


const startApp = async () => {
    await runDb()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started')
    })
}
// startApp()