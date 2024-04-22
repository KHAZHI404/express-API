import {connectToDB} from "./db/db";
import {app} from "./app";
import {SETTINGS} from "./setting";


const startApp = async () => {
    await connectToDB()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started')
    })
}
startApp()