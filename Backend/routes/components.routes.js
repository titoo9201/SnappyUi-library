import express from "express"
import isAuth from "../middleware/auth.middleware.js"
import * as aicomponentsController from "../controllers/aicomponent.controller.js"
import * as componentController from "../controllers/component.controller.js"
const componentsRouter = express.Router()
componentsRouter.post("/generate",isAuth,aicomponentsController.createComponent)
componentsRouter.post("/save",isAuth,componentController.saveComponent)
componentsRouter.post("/publish",isAuth,componentController.publishComponent)

export default componentsRouter