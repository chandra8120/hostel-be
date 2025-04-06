import express from "express";
import contactRouter from './contact.route.js'
import studentsRouter from './students.router.js'
import breakFastRouter from './breakfast.router.js'
import adminRouter from './admin.router.js'
import roomsRouter from './rooms.router.js'
const app=express()

app.use("/contact",contactRouter)
app.use("/students",studentsRouter)
app.use("/rooms",roomsRouter)
app.use("/break-fast",breakFastRouter)
app.use("/admin",adminRouter)
export default app