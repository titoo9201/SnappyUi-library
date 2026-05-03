import {userModel} from "../models/user.model.js";
import {componentModel} from "../models/component.model.js"
import path from "path"
import fs from "fs"
import {execSync} from "child_process"
export const saveComponent= async(req,res)=>{
try{
    const {name,code,props}=req.body
    const user = await userModel.findById(req.userId)
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    if(user.role==="admin"){
        const exisitingComponent = await componentModel.findOne({
            name,
            visibility:"public",
            
        })
        if(exisitingComponent){
            return res.status(400).json({
                message:"Admin cannot create duplicate public component name"
            })
        }
    }
    if(user.role==="user"){
        const exisitingComponent = await componentModel.findOne({
            name,
            owner:req.userId,
        })
        if(exisitingComponent){
            return res.status(400).json({
                message:"you have already created a component with the same name, please choose a different name"
            })
        }
    }
    const newComponent = await componentModel.create({
        name,
        code,
        props,
        owner:req.userId,

    })
    return res.status(201).json(newComponent)
}catch(err){
    return res.status(500).json({
        message:"Internal Server Error",
        error:err.message
    })
}
}

export const publishComponent = async(req,res)=>{
    try{
        const user = await userModel.findById(req.userId)
        if(!user||user.role!=="admin"){
            return res.status(403).json({
                message:"Only admin can publish components"
            })
        }
        const {componentId}=req.body
        const component = await componentModel.findById(componentId)
        if(!component){
            return res.status(404).json({
                message:"Component not found"
            })
        }
        if(component.owner.toString()!==req.userId.toString()){
            return res.status(403).json({
                message:"You can only publish your own components"
            })
        }
        const libaryPath = path.join(process.cwd(),"../SnappyUI-lib")
        const componentDir = path.join(libaryPath,"src/components",component.name)
        const componentFile = path.join(componentDir,`${component.name}.jsx`)
        const indexFile = path.join(libaryPath,"src/index.js")
        // create component directory if not exists
        if(!fs.existsSync(componentDir)){
            fs.mkdirSync(componentDir,{recursive:true})
        }
        // write component code to file
        fs.writeFileSync(componentFile,component.code)
        // update index.js to export the component
        let indexContent = fs.readFileSync(indexFile,"utf-8")
        const exportLine= `export {${component.name}} from "./components/${component.name}/${component.name}.jsx";`
        // check if export line already exists in index.js
        if(!indexContent.includes(exportLine)){
            fs.appendFileSync(indexFile,`\n${exportLine}\n`);
        }
        // clead old build files
        console.log("cleaning old build files...")
        const distPath = path.join(libaryPath,"dist")
        if(fs.existsSync(distPath)){
            fs.rmSync(distPath,{recursive:true,force:true})
        }
        // build the library
        console.log("building library...")
        execSync("npm run build",{
            cwd:libaryPath,
            stdio:"inherit"
        })

        //update the version in package.json
        console.log("updating package version...")
        execSync("npm version patch --no-git-tag-version",{
            cwd:libaryPath,
            stdio:"inherit"
        })
        // publish to npm
        console.log("publishing to npm...")
        execSync("npm publish --access public",{
            cwd:libaryPath,
            stdio:"inherit"
        })
    component.visibility="public"
    component.npmpackage ="snappyui-lib"
    await component.save()
    return res.status(200).json({
        message:"Component published successfully",
        
    })

    }catch(err){
        console.error("Error publishing component:",err)
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}