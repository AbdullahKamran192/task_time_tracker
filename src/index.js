import express from "express"
import dotenv  from "dotenv"
import path from "path"
import { tasksRouter } from "./Routes/tasks.js"
dotenv.config()

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./src/Views"))

app.use(express.static('./src/Public'))

app.use(tasksRouter)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))