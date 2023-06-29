import { system } from "./system.js"
import { communitys, comunity_list, createcom, getidbyusername, getuserprofile, selectedcoms, selectuser } from "../database.js"
export function routes(app){
    
    system(app)

    app.get("/", async (req, res) => {
        const communityData = await communitys();
        res.render("home", { communitys: communityData, req });
    })
    app.get("/community/create", async (req, res) => {
        res.render("create_community", {req})
    })
    app.get("/community/:id", async (req, res) => {
        const id = req.params.id;
        const creator_info = await selectuser(id)
        const com_info = await selectedcoms(id)
        res.render("community", {community: com_info, creator_info, req})
    })
    app.get("/", async (req, res) => {
        const communityData = await communitys();
        res.render("home", { communitys: communityData, req });
    })
    app.post("/create", async (req, res) => {
        const name = req.body.name;
        const privacy = req.body.privacy;
        const users_name = req.session.username;
        const getuser = await getidbyusername(users_name)
        var usercount = 0
        var privacy_stats
        if (!!privacy === true){
            privacy_stats = 1
        }
        else if (!!privacy === false){
            privacy_stats = 0
        }
        getuser.forEach(function(getuser) {
            var new_id = getuser.id
            createcom(name,privacy_stats,usercount,new_id)
        });
        res.redirect("/")
    })
    app.get("/user/:id", async (req, res) => {
        const id = req.params.id;
        const user_data = await getuserprofile(id) 
        const list = await comunity_list(id)
        console.log(list)
        res.render("user_profile", {list ,user:user_data , req });
    })

}